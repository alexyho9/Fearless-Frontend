import React, {useEffect, useState} from "react";


function ConferenceForm () {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [maxPresentations, setMaxPresentations] = useState('');
    const [maxAttendees, setMaxAttendees] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [locations, setLocations] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    }

    const handleMaxPresentationsChange = (event) => {
        setMaxPresentations(event.target.value);
    }

    const handleMaxAttendeesChange = (event) => {
        setMaxAttendees(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.name = name;
        data.starts = startDate;
        data.ends = endDate;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.location = location;
        data.description = description;

        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {

            const newConference = await response.json();
            console.log(newConference);

            setName('');
            setStartDate('');
            setEndDate('');
            setMaxPresentations('');
            setMaxAttendees('');
            setLocation('');
            setDescription('');
        }
    }



    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();

            setLocations(data.locations);

          }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (

        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a new conference</h1>
                <form onSubmit={handleSubmit} id="create-conference-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleNameChange} placeholder="Name" required type="text" id="name" name="name" className="form-control" value={name}/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleStartDateChange} placeholder="Start date" required type="date" id="starts" name="starts" className="form-control" value={startDate} />
                        <label htmlFor="starts">Start date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleEndDateChange} placeholder="End date" required type="date" id="ends" name="ends" className="form-control" value={endDate} />
                        <label htmlFor="ends">End date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleMaxPresentationsChange} placeholder="Max presentations" required type="number" id="max_presentations" name="max_presentations" className="form-control" value={maxPresentations} />
                        <label htmlFor="max_presentations">Max presentations</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleMaxAttendeesChange} placeholder="Max attendees" required type="number" id="max_attendees" name="max_attendees" className="form-control" value={maxAttendees}/>
                        <label htmlFor="max_attendees">Max attendees</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <select onChange={handleLocationChange} required id="location" name="location" className="form-select" value={location}>
                            <option value="">Choose a location</option>
                            {locations.map(location => {
                                return (
                                <option value={location.id} key={location.id}>
                                    {location.name}
                                </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea onChange={handleDescriptionChange} className="form-control" id="description" name="description" placeholder="Description" rows="3" value={description}></textarea>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
    )
}
export default ConferenceForm;
