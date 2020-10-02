import firebase from 'firebase.js';

const getRealTimeRef = (path) => firebase.database().ref(path);

export const fetchDocument = async (collection, id) => {
  const document = (
    await getRealTimeRef(`${collection}/${id}`).once(`value`)
  ).val();

  return document ? { id, ...document } : null;
};

export const fetchCollection = async (collection, options = {}) => {
  let baseQuery = getRealTimeRef(collection);

  if (options.filterBy) {
    const { filterBy, value } = options;
    baseQuery = baseQuery.orderByChild(filterBy).equalTo(value);
  }

  const fetchedCollection = (await baseQuery.once('value')).val();

  const data = fetchedCollection
    ? Object.entries(fetchedCollection).map(([key, value]) => ({
        id: key,
        ...value,
      }))
    : [];

  return data;
};

export const deleteDocument = (collection, id) => {
  return getRealTimeRef(`${collection}/${id}`).remove();
};

export const createDocument = (collection, id, values) => {
  return getRealTimeRef(`${collection}/${id}`).set(values);
};

export const updateDocument = (collection, id, values) => {
  return getRealTimeRef(`${collection}/${id}`).update(values);
};
