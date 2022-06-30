import {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'

class _FirestoreService {
  store = firebase.firestore()

  getCollectionRef(collection: string) {
    return this.store.collection(collection)
  }

  getDocRef(
    collection: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>,
    doc: string = '',
  ) {
    if (!doc) {
      throw new Error('No document reference')
    }
    return collection.doc(doc)
  }
  convertCollectionsSnapshotToMap = (collections: any) => {
    const transformedCollection = collections.docs.map((doc: any) => {
      const data = doc.data()

      return {
        id: doc.id,
        ...data,
      }
    })

    return transformedCollection
  }
}

const firestoreService = new _FirestoreService()

export default firestoreService
