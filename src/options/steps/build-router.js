const express = require('express');
const _       = require('../../utils');
const pkg     = require('../../../package.json');

const EMPTY_OK = true;

const toData = ({ body, query }) => {
  if (_.isObject(body)) {
    const result = {
      ...body,
      ...query
    }
    const count = Object.keys(result).length;
    return count > 0 ? result : undefined;
  }
  if (_.isValidString(body) || _.isNumber(body) || _.isValidArray(body, EMPTY_OK)) {
    return body;
  }
  return undefined
}
const toUrl = (curPath, key, opts) => {

  const isEnum = opts.caps && (key === key.toUpperCase());
  let newKey = isEnum ? key : _.toSnakeCase(key);
  if (key.startsWith('.')) {
    newKey = `.${newKey}`
  }

  return [curPath, newKey.split('_').join('-')].join('/');
}
const buildRouteDefintion = opts => {

  let obj;

  opts.routes.filter(x => (x && x.type !== 'ROUTE')).forEach(route => {
    obj = opts.def;
    const keys = route.url.split('/').filter(_.isValidString);
    for (let i = 0; i < keys.length - 1; i += 1) {
      const key = keys[i];
      obj[key] = obj[key] || {};
      obj = obj[key];
    }
    obj[keys[keys.length - 1]] = route.type;
  })
}
const addGet = (curRouter, curPath, key, value, opts) => {
  const url = toUrl(curPath, key, opts);
  if (opts.routes.some(x => (x && x.url === url))) {
    return;
  }
  opts.routes.push({ type: 'GET', url });
  curRouter.get(url, (req, res) => {
    return res.json({ result: value });
  })
}
const addPost = (curRouter, curPath, key, fn, opts) => {
  const url = toUrl(curPath, key, opts);
  if (opts.routes.some(x => (x && x.url === url))) {
    return;
  }
  opts.routes.push({ type: 'POST', url });
  if (_.isAsync(fn)) {
    curRouter.post(url, async (req, res, next) => {
      try {
        const result = await fn(toData(req));
        return res.json({ result })
      } catch (ex) {
        return next(ex)
      }
    })       
  } else {
    curRouter.post(url, (req, res, next) => {
      try {
        const result = fn(toData(req));
        return res.json({ result })
      } catch (ex) {
        return next(ex)
      }
    })
  }

}
const addRouter = (curRouter, curPath, key, obj, opts) => {
  const url = toUrl(curPath, key, opts);
  if (opts.routes.some(x => (x && x.url === url))) {
    return;
  }
  opts.routes.push({ type: 'ROUTE', url });
  const childRouter = express.Router();
  buildRouter(childRouter, url, obj, opts);
  curRouter.use(childRouter);
}
const buildRouter = (curRouter, curPath, obj, opts) => {

  if (_.isNumber(opts.depth) && opts.level >= Number(opts.depth)) {
    return;
  }

  opts.level += 1;

  const keys       = Object.keys(obj).filter(x => (x && _.isValidString(x) && _.isDefined(obj[x])));
  const primatives = keys.filter(x => (x && 
    (_.isValidString(obj[x]) || _.isValidArray(obj[x], EMPTY_OK) || _.isNumber(obj[x]))
  ));
  const objects    = keys.filter(x => (x && _.isObject(obj[x])));
  const functions  = keys.filter(x => (x && _.isFunction(obj[x])));

  primatives.forEach(key => {
    addGet(curRouter, curPath, key, obj[key], opts);
  });

  functions.forEach(key => {
    addPost(curRouter, curPath, key, obj[key], opts);
  })

  objects.filter(x => (x && obj[x] && !opts.done.includes(obj[x]))).forEach(key => {
    opts.done.push(obj[key]);
    addRouter(curRouter, curPath, key, obj[key], opts);
  })

}

const buildRouterFromLibrary = opts => {

  if (!opts.library) {
    return [];
  }

  const errors = [];

  const response = {
    name  : pkg.name,
    desc  : pkg.description,
    ver   : pkg.version,
    base  : opts.base,
    port  : opts.port,
    date  : (new Date()).toISOString()
  }

  opts.level  = 0;
  opts.done   = [];
  opts.routes = [];
  opts.router = express.Router();
  opts.def    = {};
  opts.router.get(opts.base, (req, res) => {
    return res.json(response);
  });
  
  // if (NODE_ENV.startsWith('dev')) {
  //   console.debug(' ');
  // }
  
  buildRouter(opts.router, opts.base, opts.library, opts)

  // if (NODE_ENV.startsWith('dev')) {
  //   console.debug(' ');
  // }

  if (opts.routes.length === 0) {
    return ['Nothing to do.'];
  }

  // Larger status route
  if (!opts.routes.some(x => (x && x.url === toUrl(opts.base, 'status', opts)))) {
    opts.router.get(toUrl(opts.base, 'status', opts), (req, res) => {
      return res.json({
        ...response,
        routes: opts.routes
      });
    });
  }

  // Publish Definition route
  if (_.isValidString(opts.publish)) {
    buildRouteDefintion(opts);
    const url = toUrl(opts.base, opts.publish, opts);
    opts.router.get(url, (req, res) => {
      return res.json(opts.def);
    });
  }

  // Error handling route
  opts.router.use((err, req, res, next) => {
    let message = 'Something failed!';
    console.debug(JSON.stringify(err, null, 2));
    if (err.message) {
      message = err.message;
    }
  if (req.xhr) {
      return res.status(err.status || 500).send({ error: message });
    } 
    next(err);
  });
  
  return errors;
};

module.exports = buildRouterFromLibrary;
