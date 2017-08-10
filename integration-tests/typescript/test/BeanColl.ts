import {Type, Expose} from 'class-transformer';


export class BeanCollBuilder implements BeanCollNullable {
  _names: string[];
  _ages: Set<number>;
  _nameToAge: Map<string,number>;

public constructor() {}

public names(names : string[]) : BeanCollNullable {
  this._names = names;
  return this;
}

public ages(ages : Set<number>) : BeanCollNullable {
  this._ages = ages;
  return this;
}

public nameToAge(nameToAge : Map<string,number>) : BeanCollNullable {
  this._nameToAge = nameToAge;
  return this;
}

build() : BeanColl {
 return new BeanColl(this._names, this._ages, this._nameToAge);
}
}export interface BeanCollNullable {
  names(names : string[]) : BeanCollNullable;
  ages(ages : Set<number>) : BeanCollNullable;
  nameToAge(nameToAge : Map<string,number>) : BeanCollNullable;
  build() : BeanColl;
}

export class BeanColl {
  @Expose({ name: 'names' }) private _names: string[];
  @Type(() => Set<number>)  @Expose({ name: 'ages' }) private _ages: Set<number>;
  @Type(() => Map<string,number>)  @Expose({ name: 'nameToAge' }) private _nameToAge: Map<string,number>;

static buildBeanColl() : BeanCollNullable {
  return new BeanCollBuilder();
}
static newBeanColl(names : string[], ages : Set<number>, nameToAge : Map<string,number>) : BeanColl {
  return new BeanColl(names, ages, nameToAge);
}

public constructor( names? : string[], ages? : Set<number>, nameToAge? : Map<string,number>) {
  this._names = names;
  this._ages = ages;
  this._nameToAge = nameToAge;
}

public get names() : string[] { return this._names; }
public get ages() : Set<number> { return this._ages; }
public get nameToAge() : Map<string,number> { return this._nameToAge; }
public withNames(names : string[]) : BeanColl {
  return new BeanColl(names, this._ages, this._nameToAge);
}

public withAges(ages : Set<number>) : BeanColl {
  return new BeanColl(this._names, ages, this._nameToAge);
}

public withNameToAge(nameToAge : Map<string,number>) : BeanColl {
  return new BeanColl(this._names, this._ages, nameToAge);
}

}