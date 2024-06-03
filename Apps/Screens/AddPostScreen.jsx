import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, ToastAndroid, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, getFirestore, } from "firebase/firestore";
import { app } from '../../firebaseConfig';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const storage = getStorage();
  const {user}=useUser();
  const [loading, setLoading]=useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));

    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList(categoryList =>[...categoryList, doc.data()]);
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod =async(value) => {
    setLoading(true);
    //value.image = image;
    console.log(value);
    // Here you can perform any further actions like submitting data to Firebase
    const resp=await fetch(image)
    const blob=await resp.blob();
    const storageRef = ref(storage, 'productspost/'+Date.now()+".jpg");
    
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or a file!');
    })
     .catch((error) => {
      console.error('Error uploading file:', error);
    })
    .then((resp)=>{
        getDownloadURL(storageRef).then(async(downloadUrl)=>{
          console.log(downloadUrl);
          value.image = downloadUrl;
          value.userName=user.fullName;
          value.userEmail=user.primaryEmailAddress.emailAddress;
          value.userImage=user.imageUrl;

          const docRef=await addDoc(collection(db, "UserPost"),value)
          if(docRef.id)
            {
              setLoading(false);
              console.log("Document Added!")
              Alert.alert('Success!!!', 'Post added successfully.')
            }

        })
      });

  };

  const placeholderImage = require('./../../assets/images/placeholder-icon-design-free-vector.jpg');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ADD NEW POST</Text>
      <Formik
        initialValues={{ title: '', desc: '', category: '', address: '', price: '', image: '',userName: '',userEmail: '', userImage:'',createdAt:Date.now() }}
        onSubmit={value=>onSubmitMethod(value)} // Corrected assignment here
        validate={(values)=>{
          const errors={}
          if(!values.title)
          {
            console.log("Title must be Present");
            ToastAndroid.show('Title must be there', ToastAndroid.SHORT)
            errors.name="Title must be there"
          }
          return errors
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors }) => (
          <View>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Image source={placeholderImage} style={styles.image} />
              )}
            </TouchableOpacity>
            
            <TextInput
              style={styles.input}
              placeholder='Title'
              value={values.title}
              onChangeText={handleChange('title')}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder='Description'
              value={values.desc}
              multiline
              onChangeText={handleChange('desc')}
            />
            <TextInput
              style={styles.input}
              placeholder='Price'
              value={values.price}
              keyboardType='numeric'
              onChangeText={handleChange('price')}
            />
            <TextInput
              style={styles.input}
              placeholder='Address'
              value={values.address}
              onChangeText={handleChange('address')}
            />

            <Picker
              selectedValue={values.category}
              style={styles.input}
              onValueChange={(itemValue) => setFieldValue('category', itemValue)}
            >
              {categoryList.map((item, index) => (
                <Picker.Item key={index} label={item.name} value={item.name} />
              ))}
            </Picker>

            <TouchableOpacity style={styles.button} 
            onPress={handleSubmit}
            disabled={loading}
            //style={{ backgroundColor: loading ? '#CCCCCC' : '#007AFF', paddingVertical: 12, borderRadius: 11, alignItems: 'center', marginTop: 20 }}
            >
              {loading?
              <ActivityIndicator color='#fff'/>
            :
            
              <Text style={styles.buttonText}>Submit</Text>
            }
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderRadius: 11,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 18,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 11,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
