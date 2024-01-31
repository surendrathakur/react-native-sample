import * as Constants from './constants';
import Realm from 'realm';

// Define realm schema
const Schema = {
  name: Constants.NOTE_DB_NAME,
  properties: {
    _id: 'int',
    title: 'string',
    noteText: 'string'
  },
};

// Define realm schema
const TrashSchema = {
  name: Constants.TRASH_DB_NAME,
  properties: {
    _id: 'int',
    title: 'string',
    noteText: 'string'
  },
};

/**
 * Save note to realm db
 * 
 * @param title note title
 * @param noteText note text
 */
export const saveNote = async (
  title: String,
  noteText: String,
) => {
  const realm = await Realm.open({
    path: Constants.NOTE_DB_PATH,
    schema: [Schema],
  });

  realm.write(() => {

    realm.create(Constants.NOTE_DB_NAME, {
      _id: Math.floor(Math.random() * 1000) + 1,
      title: title,
      noteText: noteText
    });
  });
};

/**
 * 
 * @param _id note id
 * @param noteText note text
 */
export const editNote = async (
  _id: number,
  noteText: any,
) => {
  console.log("editNote----", _id);
  console.log("editNote----", noteText);
  
  const realm = await Realm.open({
    path: Constants.NOTE_DB_PATH,
    schema: [Schema],
  });
  const q: any = realm.objects(Constants.NOTE_DB_NAME).filtered('_id == $0', _id);

  realm.write(() => {
    //const q: any = realm.objects(Constants.NOTE_DB_NAME)[_id]
    if (q) {
      q.noteText = noteText;
      console.log("editNote--2--", noteText);
    }
  });

};

/**
 * Save trash note to realm db
 * 
 * @param title note title
 * @param noteText note text
 */
export const saveTrashNote = async (
  title: String,
  noteText: String,
) => {
  const realm = await Realm.open({
    path: Constants.TRASH_DB_PATH,
    schema: [TrashSchema],
  });

  realm.write(() => {

    realm.create(Constants.TRASH_DB_NAME, {
      _id: Math.floor(Math.random() * 1000) + 1,
      title: title,
      noteText: noteText
    });
  });
};

// get note list from realm db
export const getNoteList = async () => {
  let noteList: any = [];
  const realm = await Realm.open({
    path: Constants.NOTE_DB_PATH,
    schema: [Schema],
  });
  let query: any

  query = realm.objects(Constants.NOTE_DB_NAME);
  if (query.length > 0) {
    noteList = JSON.stringify(query);
  }
  return noteList;
};

// get trash note list from realm db
export const getTrashNoteList = async () => {
  let noteList: any = [];
  const realm = await Realm.open({
    path: Constants.TRASH_DB_PATH,
    schema: [TrashSchema],
  });
  let query: any

  query = realm.objects(Constants.TRASH_DB_NAME);
  if (query.length > 0) {
    noteList = JSON.stringify(query);
  }
  return noteList;
};
/**
 * Delete note from realm db
 * @param id id of note to be delete
 */
export const deleteNote = async (_id: any) => {
  const realm = await Realm.open({
    path: Constants.NOTE_DB_PATH,
    schema: [Schema],
  });

  realm.write(() => {
    //const q = realm.objectForPrimaryKey("Note_app_db", _id);
    const q = realm.objects(Constants.NOTE_DB_NAME).filtered('_id == $0', _id);
    if (q) {
      realm.delete(q);
    }
  });
};

