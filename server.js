const express = require('express');
const bodyParser = require('body-parser');  // Import the body-parser package
const app = express();
const port = process.env.PORT || 3000;

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// The crimes data (provided by you)
let crimesData = [
    {
        "id": 1,
        "national_id": 86597452,
        "report_details": "A group of masked individuals were seen breaking into a store.",
        "crime_type": "Robbery",
        "report_date_time": "2025-03-08-14-30",
        "report_status": "Under Investigation",
        "latitude": 23.588,
        "longitude": 58.3829
    },
    {
        "id": 2,
        "national_id": 265612544,
        "report_details": "Loud screaming heard from an abandoned building.",
        "crime_type": "Assault",
        "report_date_time": "2025-03-08-18-45",
        "report_status": "Pending",
        "latitude": 23.5955,
        "longitude": 58.4096
    },
    {
        "id": 3,
        "national_id": 98261541,
        "report_details": "A person with a firearm spotted near a school.",
        "crime_type": "Homicide",
        "report_date_time": "2025-03-08-09-15",
        "report_status": "En Route",
        "latitude": 23.61,
        "longitude": 58.491
    },
    {
        "id": 4,
        "national_id": 94521564,
        "report_details": "A child was taken by an unknown individual near the park.",
        "crime_type": "Kidnapping",
        "report_date_time": "2025-03-08-22-10",
        "report_status": "On Scene",
        "latitude": 23.6205,
        "longitude": 58.4378
    },
    {
        "id": 5,
        "national_id": 865545452,
        "report_details": "Suspicious activity reported near a bank after closing hours.",
        "crime_type": "Robbery",
        "report_date_time": "2025-03-08-01-05",
        "report_status": "Resolved",
        "latitude": 23.5821,
        "longitude": 58.4617
    },
    {
        "id": 6,
        "national_id": 64512145,
        "report_details": "A vehicle was stolen from a parking lot.",
        "crime_type": "Theft",
        "report_date_time": "2025-03-07-23-30",
        "report_status": "Under Investigation",
        "latitude": 24.3643,
        "longitude": 56.7462
    },
    {
        "id": 7,
        "national_id": 156266151,
        "report_details": "A group of individuals forcefully entered a warehouse and stole equipment.",
        "crime_type": "Robbery",
        "report_date_time": "2025-03-07-19-15",
        "report_status": "Pending",
        "latitude": 24.3548,
        "longitude": 56.7044
    },
    {
        "id": 8,
        "national_id": 98854154,
        "report_details": "A person was attacked outside a shopping mall.",
        "crime_type": "Assault",
        "report_date_time": "2025-03-06-15-50",
        "report_status": "Under Investigation",
        "latitude": 17.0204,
        "longitude": 54.0897
    },
    {
        "id": 9,
        "national_id": 954154545,
        "report_details": "An altercation at a sports event resulted in serious injuries.",
        "crime_type": "Assault",
        "report_date_time": "2025-03-06-12-10",
        "report_status": "Pending",
        "latitude": 22.9333,
        "longitude": 57.5333
    },
    {
        "id": 10,
        "national_id": 36594515,
        "report_details": "A drive-by shooting was reported in a remote village.",
        "crime_type": "Homicide",
        "report_date_time": "2025-03-06-08-30",
        "report_status": "En Route",
        "latitude": 22.926,
        "longitude": 57.5301
    },
    {
        "id": 11,
        "national_id": 78255632,
        "report_details": "An armed robbery occurred at a jewelry store.",
        "crime_type": "Robbery",
        "report_date_time": "2025-03-05-21-45",
        "report_status": "Resolved",
        "latitude": 24.1781,
        "longitude": 56.3038
    },
    {
        "id": 12,
        "national_id": 12546225,
        "report_details": "A child was kidnapped from a playground.",
        "crime_type": "Kidnapping",
        "report_date_time": "2025-03-05-17-10",
        "report_status": "On Scene",
        "latitude": 23.6005,
        "longitude": 57.9231
    },
    {
        "id": 13,
        "national_id": 148656202,
        "report_details": "A man was fatally shot in a private residence.",
        "crime_type": "Homicide",
        "report_date_time": "2025-03-05-14-00",
        "report_status": "Under Investigation",
        "latitude": 23.5849,
        "longitude": 58.3874
    },
    {
        "id": 14,
        "national_id": 398416544,
        "report_details": "A violent altercation broke out at a marketplace.",
        "crime_type": "Assault",
        "report_date_time": "2025-03-04-20-20",
        "report_status": "Pending",
        "latitude": 23.5852,
        "longitude": 58.3906
    },
    {
        "id": 15,
        "national_id": 78454545,
        "report_details": "A luxury car was stolen from a hotel parking lot.",
        "crime_type": "Theft",
        "report_date_time": "2025-03-04-06-45",
        "report_status": "Resolved",
        "latitude": 22.5663,
        "longitude": 59.5289
    },
    {
        "id": 16,
        "national_id": 11220015,
        "report_details": "This is a test for date time report",
        "crime_type": "Theft",
        "report_date_time": "2025-03-24-13-27",
        "report_status": "Pending",
        "latitude": 15.882733760125845,
        "longitude": 44.58724900302568
    }
];

// Set up the API endpoint to retrieve all crimes
app.get('/api/crimes', (req, res) => {
    res.json(crimesData);
});

// Set up the API endpoint to get a crime by ID
app.get('/api/crimes/:id', (req, res) => {
    const crimeId = parseInt(req.params.id, 10);
    const crime = crimesData.find(c => c.id === crimeId);
    if (crime) {
        res.json(crime);
    } else {
        res.status(404).send('Crime not found');
    }
});

// Set up the API endpoint to add a new crime (POST)
app.post('/api/crimes', (req, res) => {
    const newCrime = req.body;  // This is the data sent in the POST request

    // Optionally, validate the incoming data
    if (!newCrime.id || !newCrime.crime_type || !newCrime.report_details) {
        return res.status(400).send('Missing required fields');
    }

    // Add the new crime to the crimesData array
    crimesData.push(newCrime);

    // Respond with the newly added crime
    res.status(201).json(newCrime);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
