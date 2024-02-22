

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import Registrasion from './pages/registrasion/Registrasion';
import Login from "./pages/login/Login";
import Sidebar from "./pages/sidebar/Sidebar";
import Home from "./pages/sidebar/Home";
import Message from "./pages/sidebar/messaGe";
import Notification from "./pages/sidebar/Notification";
import Rootlayout from "./components/layout/Rootlayout";
import Settings from"./pages/sidebar/Settings"
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/'  element={<Login/>}/>
        <Route path='/registrasion'  element={<Registrasion/>}/>
        <Route path='/sidebar'  element={<Sidebar/>}/>
        <Route element={<Rootlayout/>}>
          <Route path='/home'  element={<Home/>}/>
          <Route path='/message'  element={<Message/>}/>
          <Route path='/notification'  element={<Notification/>}/>
          <Route path="/setting" element={<Settings/>}/>
        </Route>
        

       



      </>
    )
  );

  return (
    <>
      <RouterProvider
      router={router}
      />
    </>
  )
}

export default App
