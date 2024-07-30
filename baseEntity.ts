import { v4 as uuidv4 } from "uuid";
class BaseEntity {
  _id: string | null = null;
  uId: string | null = null;
  dType: string | null = null;
  createdBy: string | null = null;
  createdByName: string | null = null;
  createdOn: string | null = null;
  updatedBy: string | null = null;
  updatedByName: string | null = null;
  updatedOn: string | null = null;
  version: number = 0;
  active: boolean = true;
  archived: boolean = false;
  customFields: any[] = [];

  initialize(
    isNew: boolean,
    dType: string,
    createdOrUpdatedBy: string,
    createdOrUpdatedByName: string
  ): void {
    this.dType = dType;
    this._id = uuidv4();
    this.active = true;
    this.archived = false;

    if (isNew) {
      // Adding new record
      this.uId = this._id;
      this.createdBy = createdOrUpdatedBy;
      this.createdByName = createdOrUpdatedByName;
      this.createdOn = new Date().toISOString();
      this.version = 1;
      this.updatedBy = createdOrUpdatedBy;
      this.updatedByName = createdOrUpdatedByName;
      this.updatedOn = this.createdOn;
    } else {
      // Updating record
      this.updatedBy = createdOrUpdatedBy;
      this.updatedByName = createdOrUpdatedByName;
      this.updatedOn = new Date().toISOString();
      this.version++;
    }
  }
}

export function initialize(
  isNew: boolean,
  dType: string,
  createdOrUpdatedBy: string,
  createdOrUpdatedByName: string,
  object: any
): any {
  object.dType = dType;
  object._id = uuidv4();
  object.active = true;
  object.archived = false;

  if (isNew) {
    // Adding new record
    object.uId = object._id;
    object.createdBy = createdOrUpdatedBy;
    object.createdByName = createdOrUpdatedByName;
    object.createdOn = new Date().toISOString();
    object.version = 1;
    object.updatedBy = createdOrUpdatedBy;
    object.updatedByName = createdOrUpdatedByName;
    object.updatedOn = object.createdOn;
  } else {
    // Updating record
    object.updatedBy = createdOrUpdatedBy;
    object.updatedByName = createdOrUpdatedByName;
    object.updatedOn = new Date().toISOString();
    object.version++;
  }
  return object;
}
export default BaseEntity;
