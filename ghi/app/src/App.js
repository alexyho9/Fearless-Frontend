import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm'
import AttendForm from './AttendForm'

function App(props) {

  return (
    <>
    <Nav />
    <div className='container'>
      <AttendForm />
      {/* <ConferenceForm /> */}
      {/* <LocationForm /> */}
      {/* <AttendeesList attendees = {props.attendees}/> */}
    </div>
    </>
  );
}

export default App;
