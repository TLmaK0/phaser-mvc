export function BodyProperty(target: any, key: string){
  if (!target['bodyProperties']) target['bodyProperties'] = [];

  const privateKey = "_" + key;
  const upperKey = key.toUpperCase();
  const getKey = "get" + upperKey;
  const setKey = "set" + upperKey;
  const getBodyKey = "getBody" + upperKey;
  const setBodyKey = "setBody" + upperKey;

  target[getKey] = function(){
    return this[privateKey];
  }

  target[setKey] = function(value: any){
    this[privateKey] = value;
  }

  target[getBodyKey] = function(){
    return this['body'][key];
  }

  target[setBodyKey] = function(value: any){
    this['body'][key] = value;
  }

  function getter(){
    return this[getKey]();
  }

  function setter(value: any){
    this[setKey](value);
  }

  Object.defineProperty( target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });

  target['bodyProperties'].push(upperKey);
}
