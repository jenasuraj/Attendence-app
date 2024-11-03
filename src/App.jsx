import {BrowserRouter,createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './components/Home';
import InputData from './components/InputData';
import Attendence from './components/Attendence';
import UpdateProfile from './components/UpdateProfile';
import SetAttendence from './components/SetAttendence';
function App() {
  const router = createBrowserRouter([
   {path:'/',element:<Home />},
   {path:'/form-section',element:<InputData />},
   {path:'/see-attendence',element:<Attendence />},
   {path:'/updateFile/:id', element:<UpdateProfile />},
   {path:'/set-attendence/:id',element:<SetAttendence />}
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
