import React from 'react';
import { Link } from 'react-router-dom';
import aboutImage from '../images/About.jpg';  // הנתיב לתמונה שלך
import '../css/AboutSection.css';

const AboutSection = () => {
    return (
     
<div className="about-content">
    <h1>About Us</h1>

    <p>
        Pack for CampTM is a family-run online store, 
        dedicated to all your summer camp needs.
    </p>

    <p>
        We provide everything from soft trunks 
        and name labels, to clip-on fans and bedding.
    </p>

    <p>
        Our laundry accessories, toiletries, 
        and storage solutions make packing simple.
    </p>

    <p>
        We offer special logowear collections 
        designed for our partner camps.
    </p>

    <p>
        Our smart packing list lets you order 
        everything with just one click.
    </p>

    <p>
        Browse our collections at your own pace 
        and find exactly what you need.
    </p>

    <h2>Our Story</h2>
    <p>
        Meet Gaby Fachler and Melissa Goldwag, 
        the founders of Pack for Camp.
    </p>


    <p>
        Our story began around the campfire, 
        where we spent our favorite summers.
    </p>

    <p>
        Melissa's journey included roles as 
        camper, counselor, and lifeguard.
    </p>

    <p>
        Gaby grew from enthusiastic camper 
        to dedicated head counselor.
    </p>

    <h2>Family Tradition</h2>
    <p>
        Our roots trace back to "Kosher Socks," 
        run by Melissa's parents.
    </p>

    <p>
        Murray "The Sockman" and Meryl served 
        camp families for over 40 years.
    </p>

    <p>
        Their South Fallsburg store remains 
        a summer highlight for many.
    </p>

    <h2>Customer Stories</h2>
    <div className="testimonial">
        <p>
            "Pack for Camp made shopping so easy. 
            Their labels stayed perfect through washing."
        </p>
        <p>
            "Customer service responds quickly 
            and always helps solve problems."
        </p>
        <cite>- Chumi Rubin</cite>
    </div>

    <div className="testimonial">
        <p>
            "The prices are great and ordering 
            was completely hassle-free."
        </p>
        <cite>- Sarah Plaut</cite>
    </div>

    <h2>Visit Our Store</h2>
    <p>
        Find us at Kosher Socks,
        Main Street, South Fallsburg.
    </p>

    <p>
        Summer hours: Call (845) 898-1943
        for current schedule.
    </p>
    <div className="about-image">
    <img src={aboutImage} alt="Pack For Camp Store" />
     </div>


 <p>
    <Link to="/contact" className="contact-link">
        Contact Us For More Information
    </Link>
</p>

    </div>

       
    );
}; export default AboutSection;