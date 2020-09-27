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

  if (options.filterBy) {
    const { filterBy, value, isArray } = options;
    baseQuery = isArray
      ? baseQuery.where(filterBy, 'array-contains', value)
      : baseQuery.where(filterBy, '==', value);
  }

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

export const updateDocument = (collection, id, values) => {
  return getFirestoreRef(collection).doc(id).update(values);
};

export const batchUpdateDocument = (batchCollections) => {
  const batch = firebase.firestore().batch();

  Object.entries(batchCollections).forEach(([key, collectionValue]) => {
    collectionValue.documents.forEach((documentValue) => {
      const { id, field, value } = documentValue;

      const reference = getFirestoreRef(key).doc(id);

      batch.update(reference, { [field]: value });
    });
  });

  return batch.commit();
};
