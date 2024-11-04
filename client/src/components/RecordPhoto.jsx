import React from 'react';
import '../CSS/RecordPhoto.css';

const RecordPhoto = () => {
    const images = [
        {
            src: "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1492108507/articles/2016/10/31/detective-exposed-corruption-then-was-fired-for-eating-candy-at-a-crime-scene/16106-weill-crime-scene-candy-tease_kfquri",
            alt: "Crime Scene 1",
            description: "Evidence - 1 : Crime Scene",
            link: "img_5terre.jpg"
        },
        {
            src: "https://ra.ac.ae/wp-content/uploads/2016/06/crime-scene.jpg",
            alt: "Weapon",
            description: "Exhibit - 1 : Potential Murder Weapon",
            link: "img_forest.jpg"
        },
        {
            src: "https://www.crime-scene-investigator.net/images/index-evidence-collection.jpg",
            alt: "Evidence",
            description: "Exhibit - 2 : Victim's Shoe",
            link: "img_lights.jpg"
        },
        {
            src: "https://img-aws.ehowcdn.com/340x221p/photos.demandstudios.com/getty/article/88/64/87676734.jpg",
            alt: "Biological Evidence",
            description: "Biological Evidence of Suspect",
            link: "img_mountains.jpg"
        }
    ];

    return (
        <div className="row">
            {images.map((image, index) => (
                <div className="gallery" key={index}>
                    <a target="_blank" rel="noopener noreferrer" href={image.link}>
                        <img src={image.src} alt={image.alt} width="600" height="400" />
                    </a>
                    <div className="desc">{image.description}</div>
                </div>
            ))}
        </div>
    );
};

export default RecordPhoto;
