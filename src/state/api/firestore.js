// eslint-disable-next-line no-unused-vars
import { firestore } from 'firebase';

import firebase from 'firebase.js';

const getFirestoreRef = (path) => firebase.firestore().collection(path);

export const fetchDocument = async (collection, id) => {
  const document = await getFirestoreRef(collection).doc(id).get();
  if (!document.exists) {
    return null;
  }

  return { id: document.id, ...document.data() };
};

export const fetchCollection = async (collection, options = {}) => {
  const data = [];
  let baseQuery = getFirestoreRef(collection);

  if (options.queries) {
    const { queries } = options;
    queries.forEach(({ attribute, operator, value }) => {
      baseQuery = baseQuery.where(attribute, operator, value);
    });
  }

  if (options.sort) {
    const { attribute, order } = options.sort;
    baseQuery = baseQuery.orderBy(attribute, order);
  }
  (await baseQuery.get()).forEach((doc) =>
    data.push({ id: doc.id, ...doc.data() })
  );

  return data;
};

export const deleteDocument = (collection, id) => {
  return getFirestoreRef(collection).doc(id).delete();
};

export const createDocument = (collection, id, values) => {
  return getFirestoreRef(collection).doc(id).set(values);
};

export const modifyDocument = (collection, id, values) => {
  return getFirestoreRef(collection).doc(id).update(values);
};
