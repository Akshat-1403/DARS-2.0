import React from 'react';
import knife from '../../Images/knife.jpg';
import '../../CSS/Education.css';

const Educational = () => {
    // Converting class state to useState hook, though in this case since the state is static,
    // we can use a regular const since it's not being modified
    const report = [
        {
            exhibitId: 101,
            name: "Knife",
            description: "A 3 and a quarter inch wooden hilt dagger.",
            imageURL: __dirname + "/../../Images/knife.jpg"
        }
    ];

    // Keeping the console.log for debugging purposes
    console.log(report[0].imageURL);

    return (
        <div className="container signInCard center">
            <div className="card setCardWidth">
                <div className="card-image">
                    <img src={knife} alt="Notes" className="cardImageHeight"/>
                </div>
                <div className="signInContainer card-content">
                    <h4 className="grey-text card-title">Educational Report</h4>
                </div>
            </div>
        </div>
    );
};

export default Educational;