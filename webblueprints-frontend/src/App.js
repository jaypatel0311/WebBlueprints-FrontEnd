import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Templates from "./pages/Templates/Templates";
import Login from "./pages/Auth/Login";
import { useAuth } from "./context/authContext";
import Signup from "./pages/Auth/Signup";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import AdminLayout from "./components/Admin/Layout";
import AdminDashboard from "./pages/Admin/Dashboard";
import { RoleProvider } from "./context/roleContext";
import AddTemplate from "./pages/Templates/addTemplate";
import AdminTemplates from "./pages/Admin/Templates";
import { CartProvider } from "./context/cartContext";

const theme = createTheme({
  typography: {
    fontFamily: ['"PT Sans",', "sans-serif"].join(","),
  },
  // ...other theme options
});

function App() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  return (
    <RoleProvider>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <div className="App">
              {!isAdmin && <Header />}
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/templates"
                  element={
                    <ProtectedRoute>
                      <Templates />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-template"
                  element={
                    <ProtectedRoute>
                      <AddTemplate />
                    </ProtectedRoute>
                  }
                />
                {/* Admin Routes */}
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute>
                      <AdminLayout>
                        <Routes>
                          <Route index element={<AdminDashboard />} />
                          <Route
                            path="templates"
                            element={<AdminTemplates />}
                          />
                          <Route
                            path="templates/add"
                            element={<AddTemplate />}
                          />
                          <Route
                            path="templates/edit/:id"
                            element={<AddTemplate />}
                          />
                        </Routes>
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Redirect from root to login if not authenticated */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </CartProvider>
    </RoleProvider>
  );
}

export default App;
