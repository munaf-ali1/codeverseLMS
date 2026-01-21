import { Routes, Route } from "react-router-dom";

import Landing from "./components/Landing.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Courses from "./pages/Courses.jsx";
import AddCourse from "./pages/AddCourse.jsx";
import CourseLearn from "./pages/CourseLearn.jsx";
import MyCourses from "./pages/MyCourses.jsx";
import AddLesson from "./pages/AddLesson.jsx";
import AdminCourses from "./pages/AdminCourses.jsx";
import Tests from "./pages/Tests.jsx";
import TestTopic from "./pages/TestTopic.jsx";
import StartTest from "./pages/StartTest.jsx";
import TestConfig from "./pages/TestConfig.jsx";
import AddMCQ from "./pages/AddMcq.jsx";
import Footer from "./components/Footer.jsx";
import TestResultSummary from "./pages/TestResultSummary.jsx";
import TestAnalysis from "./pages/Testanalysis.jsx";
import TestHistory from "./pages/TestHistory.jsx";
import AdminAddDsaQuestion from "./pages/AdminAddDsaQuestion.jsx";
import DsaHome from "./pages/DsaHomePage.jsx";
import DsaProblem from "./pages/DsaProblem.jsx";







import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicLayout from "./components/PublicLayout.jsx";

export const serverUrl = "http://localhost:8000";

function App() {
  return (
    <>
    <Routes>

      {/* LANDING (WITH NAVBAR) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>

      {/* AUTH */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* STUDENT */}
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin/add-course"
        element={
          <ProtectedRoute adminOnly={true}>
            <AddCourse />
          </ProtectedRoute>
        }
      />
      <Route
     path="/courses/:id"
     element={
      <ProtectedRoute>
      <CourseLearn />
    </ProtectedRoute>

  }
/>
  

<Route
  path="/admin/add-mcq"
  element={
    <ProtectedRoute adminOnly={true}>
      <AddMCQ />
    </ProtectedRoute>
  }
/>



  <Route
  path="/my-courses"
  element={
    <ProtectedRoute>
      <MyCourses />
    </ProtectedRoute>
  }
/>
  <Route
  path="/admin/courses"
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminCourses />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/add-lesson/:courseId"
  element={
    <ProtectedRoute adminOnly={true}>
      <AddLesson />
    </ProtectedRoute>
  }
/>

{/* TESTS */}
<Route
  path="/tests"
  element={
    <ProtectedRoute>
      <Tests />
    </ProtectedRoute>
  }
/>

<Route
  path="/tests/:topic"
  element={
    <ProtectedRoute>
      <TestTopic />
    </ProtectedRoute>
  }
/>
<Route
  path="/tests/:topic/config"
  element={
    <ProtectedRoute>
      <TestConfig />
    </ProtectedRoute>
  }
/>


<Route
  path="/tests/:topic/start"
  element={
    <ProtectedRoute>
      <StartTest />
    </ProtectedRoute>
  }
/>
<Route
  path="/tests/result/:id"
  element={
    <ProtectedRoute>
      <TestResultSummary />
    </ProtectedRoute>
  }
/>

<Route
  path="/tests/analysis/:id"
  element={
    <ProtectedRoute>
      <TestAnalysis />
    </ProtectedRoute>
  }
/>

<Route
  path="/tests/history"
  element={
    <ProtectedRoute>
      <TestHistory />
    </ProtectedRoute>
  }
/>

// DSA ROUTES



<Route
  path="/admin/add-dsa"
  element={
    <ProtectedRoute adminOnly={true}>
      < AdminAddDsaQuestion/>
    </ProtectedRoute>
  }
/>
<Route path="/dsa" element={<ProtectedRoute><DsaHome /></ProtectedRoute>} />
<Route path="/dsa/:id" element={<DsaProblem />} />











    </Routes>
    <Footer />

    </>
    
  );
}

export default App;

