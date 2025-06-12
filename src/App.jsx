// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Landing from './Landing'
import Landing from './Landing'
import SignUp from './SignUp'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import FlippedCard from './FlippedCard'
import { SpeechProvider } from './Avatar'
import LessonPage from './LessonPage';
import GamesDashboard from './components/Games/GamesDashboard'
import FillInTheBlanks from './components/Games/FillInTheBlanks'
import Frog from './components/Games/Frog'
import Game from './components/Games/Match'
import GuessTheEmoji from './components/Games/Noun'
import RangoliGame from './components/Games/Rangoli'
import Sentence from './components/Games/Sentence'
import './App.css'
import { AuthProvider } from './utils/AuthContext'
import NavigationBar from './components/NavigationBar'
import PrivateRoute from './PrivateRoute'
import { ToastProviderComponent } from './components/ui/use-toast'
import ARDetection from './components/AR/ARDetection'
import GolcondaFortStory from './components/Stories/GolcondaFortStory'
import CharminarStory from './components/Stories/Charminar'
import MahaKumbh from './components/Stories/MahaKumbh'
import StoryDashboard from './components/Stories/StoryDashboard'
import Cleanliness from './components/Stories/Cleanliness'
import GoogleTranslate from './components/GoogleTranslate';
import CollapsibleReadAloudButton from './components/ReadAloudButton'
import LearningDashboard from './components/Learnings/LearningDashboard'
import DrawingCanvas from './components/Games/Canvas'
import HabitGame1 from './components/Learnings/Animation1'
import HabitGame2 from './components/Learnings/Animation2'
import HabitGame3 from './components/Learnings/Animation3'
import HabitGame4 from './components/Learnings/Animation4'
import HabitGame5 from './components/Learnings/Animation5'
import HabitGame6 from './components/Learnings/Animation6'

import FloatingActionButton from './FloatingActionButton'
import FloatingChat from './components/AI/FloatingChat'
import RoadmapForm from './components/Roadmap/RoadmapForm'
import SignLanguageDashboard from './components/ISL/SignLanguageDashboard'
import HandTracking from './components/ISL/HandTracking'
import HearingImpairmentAssistant from './components/ISL/spelling/spelling'
import PDFSyllabusGenerator from './components/Pdf/Pdf'

function App() {
  return (
    <AuthProvider>
      <ToastProviderComponent>
        <Router>
          <SpeechProvider>
          <div className='App'>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LoginPage />} />

              {/* protected routes (requires logged in) */}
              <Route path="/home" element={<PrivateRoute><HomePage /> </PrivateRoute>} />
              <Route path="/lesson/:levelId" element={<PrivateRoute> <LessonPage /></PrivateRoute>} />
              {/* Games */}
              <Route path="/games" element={<PrivateRoute><GamesDashboard /> </PrivateRoute>} />
              <Route path="/flippedcard" element={<PrivateRoute> <FlippedCard /></PrivateRoute>} />
              <Route path="/fillintheblanks" element={<PrivateRoute><FillInTheBlanks /> </PrivateRoute>} />
              <Route path="/frog" element={<PrivateRoute><Frog /> </PrivateRoute>} />
              <Route path="/match" element={<PrivateRoute> <Game /></PrivateRoute>} />
              <Route path="/canvas" element={<PrivateRoute><DrawingCanvas/></PrivateRoute>} />
              <Route path="/sentence" element={<PrivateRoute><Sentence /> </PrivateRoute>} />
              <Route path="/noun" element={<PrivateRoute><GuessTheEmoji /> </PrivateRoute>} />
              <Route path="/rangoli" element={<PrivateRoute><RangoliGame /> </PrivateRoute>} />
              {/* Stories */}
              <Route path="/stories" element={<PrivateRoute><StoryDashboard /> </PrivateRoute>} />
              <Route path="/golconda" element={<PrivateRoute><GolcondaFortStory/></PrivateRoute>} />
              <Route path="/cleanliness" element={<PrivateRoute><Cleanliness/></PrivateRoute>} />
              <Route path="/mahakumbh" element={<PrivateRoute><MahaKumbh/></PrivateRoute>} />
              <Route path="/charminar" element={<PrivateRoute><CharminarStory/></PrivateRoute>} />
              {/* Learnings */}
              <Route path="/learnings" element={<PrivateRoute><LearningDashboard /> </PrivateRoute>} />
              <Route path="/habit1" element={<PrivateRoute><HabitGame1 /> </PrivateRoute>} />
              <Route path="/habit2" element={<PrivateRoute><HabitGame2 /> </PrivateRoute>} />
              <Route path="/habit3" element={<PrivateRoute><HabitGame3 /> </PrivateRoute>} />
              <Route path="/habit4" element={<PrivateRoute><HabitGame4 /> </PrivateRoute>} />
              <Route path="/habit5" element={<PrivateRoute><HabitGame5 /> </PrivateRoute>} />
              <Route path="/habit6" element={<PrivateRoute><HabitGame6 /> </PrivateRoute>} />
              {/* AR */}
              <Route path="/ar" element={<PrivateRoute><ARDetection /> </PrivateRoute>} />
              {/*Extras*/}
              <Route path="/roadmap" element={<PrivateRoute><RoadmapForm /> </PrivateRoute>} />
              <Route path="/signdashboard" element={<PrivateRoute><SignLanguageDashboard /> </PrivateRoute>} />
              <Route path="/handtracking" element={<PrivateRoute><HandTracking /> </PrivateRoute>} />
              <Route path="/spelling" element={<PrivateRoute><HearingImpairmentAssistant /> </PrivateRoute>} />
              <Route path="/pdf" element={<PrivateRoute><PDFSyllabusGenerator/> </PrivateRoute>} />

              
              
            </Routes>
            <GoogleTranslate/>
            <FloatingActionButton/>
            <FloatingChat/>
            {/* <HandTracking/> */}
            <CollapsibleReadAloudButton/>
          </div>
          </SpeechProvider>
        </Router>
      </ToastProviderComponent>
    </AuthProvider>
  )
}

export default App



