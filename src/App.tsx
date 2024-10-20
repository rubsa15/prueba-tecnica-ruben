import { Header } from './component/Header/Header';
import { Rooms } from './component/Rooms/Rooms';
import { FloorsProvider } from './context/floors.context';

function App() {
  return (
    <FloorsProvider>
      <div className='container mx-auto p-4'>
        <Header />
        <div className='border border-gray-300 w-full my-8' />
        <div className='p-8 border rounded-[26px] border-[#2E344D] '>
          <Rooms />
        </div>
      </div>
    </FloorsProvider>
  );
}

export default App;
