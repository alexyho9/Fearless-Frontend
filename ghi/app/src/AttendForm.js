import React, {useEffect, useState} from "react";


function AttendForm () {
    const [conference, setConference] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [conferences, setConferences] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const handleConferenceChange = (event) => {
        setConference(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.conference = conference;
        data.name = name;
        data.email = email;

        console.log(data);

        const attendeeUrl = 'http://localhost:8001/api/attendees/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(attendeeUrl, fetchConfig);
        if (response.ok) {

            const newAttendee = await response.json();
            console.log("Response OK")
            console.log(newAttendee);

            setConference('');
            setName('');
            setEmail('');

            setSubmitted(true);
        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();

            setConferences(data.conferences);

          }
    }

    useEffect(() => {
        fetchData();
    }, []);

    let spinnerClasses = 'd-flex justify-content-center mb-3';
    let dropdownClasses = 'form-select d-none';
    if (conferences.length > 0) {
        spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
        dropdownClasses = 'form-select';
    }


    return (
    <div className="my-5">
      <div className="row">
        <div className="col col-sm-auto">
          <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" />
        </div>
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <div className={submitted ? "alert alert-success mb-0" : "d-none"} role="alert">
                This is a success alert—check it out!
              </div>
              <form onSubmit={handleSubmit} id="create-attendee-form" className={submitted ? 'd-none' : ''}>
                <h1 className="card-title">It's Conference Time!</h1>
                <p className="mb-3">
                  Please choose which conference
                  you'd like to attend.
                </p>
                <div className={spinnerClasses} id="loading-conference-spinner">
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div className="mb-3">
                  <select onChange={handleConferenceChange} name="conference" id="conference" className={dropdownClasses} value={conference.id} required>
                    <option value="">Choose a conference</option>
                    {conferences.map(conference => {
                        return (
                        <option value={conference.href} key={conference.href}>
                            {conference.name}
                        </option>
                        );
                    })}
                  </select>
                </div>
                <p className="mb-3">
                  Now, tell us about yourself.
                </p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleNameChange} required placeholder="Your full name" type="text" id="name" name="name" className="form-control" value={name}/>
                      <label htmlFor="name">Your full name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleEmailChange} required placeholder="Your email address" type="email" id="email" name="email" className="form-control" value={email}/>
                      <label htmlFor="email">Your email address</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">I'm going!</button>
              </form>
              <div className="alert alert-success d-none mb-0" id="success-message">
                Congratulations! You're all signed up!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default AttendForm;
