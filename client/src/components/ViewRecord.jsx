import React from 'react';
import ViewCaseNav from './Navbar/ViewDocNav.jsx';
import RecordPhoto from './RecordPhoto.jsx';

const ViewRecord = (props) => {
    const { recordId } = props.routeParams;
    console.log(props);

    return (
        <div>
            <ViewCaseNav recordId={recordId} />
            <div>
                <RecordPhoto />
            </div>
        </div>
    );
};

export default ViewRecord;