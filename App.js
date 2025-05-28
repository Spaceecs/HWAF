import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { Formik } from 'formik';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  surname: Yup.string().required('Surname is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm your password'),
  phone: Yup.string()
      .required('Phone is required')
      .matches(/^[0][0-9]{9}$/, 'Phone must be 10 digits long and start with 0'),
});

export default function App() {
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
          <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Formik
                  initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    password: '',
                    password2: '',
                    phone: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    alert('Form submitted!');
                    console.log(values);
                  }}
              >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                  }) => (
                    <View
                        style={[
                          styles.form,
                          isPortrait ? styles.formColumn : styles.formRow,
                        ]}
                    >
                      {/* Ліва частина */}
                      <View style={isPortrait ? null : styles.halfWidth}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        {touched.name && errors.name && (
                            <Text style={styles.error}>{errors.name}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Surname"
                            onChangeText={handleChange('surname')}
                            onBlur={handleBlur('surname')}
                            value={values.surname}
                        />
                        {touched.surname && errors.surname && (
                            <Text style={styles.error}>{errors.surname}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {touched.email && errors.email && (
                            <Text style={styles.error}>{errors.email}</Text>
                        )}
                      </View>

                      {/* Права частина */}
                      <View style={isPortrait ? null : styles.halfWidth}>
                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            keyboardType="phone-pad"
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                        />
                        {touched.phone && errors.phone && (
                            <Text style={styles.error}>{errors.phone}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {touched.password && errors.password && (
                            <Text style={styles.error}>{errors.password}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            secureTextEntry
                            onChangeText={handleChange('password2')}
                            onBlur={handleBlur('password2')}
                            value={values.password2}
                        />
                        {touched.password2 && errors.password2 && (
                            <Text style={styles.error}>{errors.password2}</Text>
                        )}
                      </View>
                    </View>
                )}
              </Formik>

              <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Button
                    title="Submit"
                    onPress={() => {
                      Keyboard.dismiss();
                      alert('Form submitted!');
                    }}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  form: {
    padding: 20,
    justifyContent: 'space-between',
  },
  formColumn: {
    flexDirection: 'column',
  },
  formRow: {
    flexDirection: 'row',
  },
  halfWidth: {
    flex: 1,
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
