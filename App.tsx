import { StyleSheet } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";

import "react-native-gesture-handler";
import { Root } from "./root";

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
