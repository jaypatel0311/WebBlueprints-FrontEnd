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
import Purchases from "./pages/Purchases";
import Users from "./pages/Admin/Users";
import { SnackbarProvider } from "notistack";
import Orders from "./pages/Admin/Orders";
import { StripeProvider } from "./context/stripeContext";
import Checkout from "./components/Checkout/Checkout";
import Contact from "./pages/Home/Contact";
import SupportQueries from "./pages/Admin/SupportQueries";
import TemplateDetails from "./pages/Templates/templateDetails";

const theme = createTheme({
  typography: {
    fontFamily:
      "Madefor-Display, Madefor Display, Helvetica Neue, Helvetica, Arial, メイリオ, Meiryo, ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro W3, Hiragino Kaku Gothic Pro, sans-serif !important",
  },
  // ...other theme options
});

function App() {
  const { user } = useAuth();
  console.log("user in App:", user);

  const userData = user?.user || user;
  const userRole = userData?.role;
  const isAdmin = userRole === "admin";
  const shouldShowHeader = !isAdmin;

  return (
    <RoleProvider>
      <SnackbarProvider maxSnack={3}>
        <CartProvider>
          <StripeProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <BrowserRouter>
                <div className="App">
                  {shouldShowHeader && <Header />}
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
                      path="/purchases"
                      element={
                        <ProtectedRoute>
                          <Purchases />
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
                    <Route
                      path="/templates/:id"
                      element={
                        <ProtectedRoute>
                          <TemplateDetails />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/contact"
                      element={
                        <ProtectedRoute>
                          <Contact />
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
                              <Route path="orders" element={<Orders />} />
                              <Route path="users" element={<Users />} />
                              <Route
                                path="templates/edit/:id"
                                element={<AddTemplate />}
                              />
                              <Route
                                path="/support"
                                element={<SupportQueries />}
                              />
                            </Routes>
                          </AdminLayout>
                        </ProtectedRoute>
                      }
                    />

                    {/* Redirect from root to login if not authenticated */}
                    <Route
                      path="*"
                      element={<Navigate to="/login" replace />}
                    />
                  </Routes>
                </div>
              </BrowserRouter>
            </ThemeProvider>
          </StripeProvider>
        </CartProvider>
      </SnackbarProvider>
    </RoleProvider>
  );
}

export default App;
