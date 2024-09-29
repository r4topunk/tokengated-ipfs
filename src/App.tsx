import './App.css'
import { ImageUploadGallery } from './components/image-upload-gallery'

function App() {
  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <h1 className='font-bold text-2xl mt-4'>Hack the planet</h1>
      <p className='text-sm mt-4'>Upload your files</p>
      <ImageUploadGallery />
    </div>
  )
}

export default App
