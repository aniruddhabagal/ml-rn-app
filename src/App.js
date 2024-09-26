import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {getModelPrediction, loadModel} from './TransformerModel';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);

  const handlePrediction = async () => {
    const model = await loadModel();
    const prediction = await getModelPrediction(model, inputText);
    setResult(prediction);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Enter text"
      />
      <Button title="Get Prediction" onPress={handlePrediction} />
      {result && <Text style={styles.result}>{JSON.stringify(result)}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
  },
});

export default App;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import {pipeline, env} from '@xenova/transformers';

// Set to use local models

// const App = () => {
//   env.useCachedModels = true;
//   env.localModelPath = './models';

//   const [classifier, setClassifier] = useState(null);
//   const [input, setInput] = useState('');
//   const [result, setResult] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadModel = async () => {
//       try {
//         // Specify the exact model you want to use
//         const pipe = await pipeline(
//           'sentiment-analysis',
//           'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
//           {
//             use_cache: true,
//             local_model_path: './models',
//           },
//         );
//         setClassifier(pipe);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error loading model:', error);
//         setIsLoading(false);
//       }
//     };

//     loadModel();
//   }, []);

//   const classifyText = async () => {
//     console.log('here');

//     if (classifier && input) {
//       try {
//         const result = await classifier(input);
//         setResult(
//           `Sentiment: ${result[0].label}, Score: ${result[0].score.toFixed(4)}`,
//         );
//       } catch (error) {
//         console.error('Classification error:', error);
//         setResult('Error classifying text');
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading model...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sentiment Analysis</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={setInput}
//         value={input}
//         placeholder="Enter text to classify"
//         multiline
//       />
//       <Button title="Classify" onPress={classifyText} disabled={!input} />
//       {result ? <Text style={styles.result}>{result}</Text> : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 100,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     padding: 10,
//     textAlignVertical: 'top',
//   },
//   result: {
//     marginTop: 20,
//     fontSize: 18,
//   },
// });

// export default App;
