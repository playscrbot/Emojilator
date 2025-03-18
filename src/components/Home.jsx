import React from 'react';
import Timeline from './Timeline';
import { Link } from 'react-router-dom';

export default function Home() {

  const events = [
    { id: 1, year: 1999, description: 'First emojis introduced', emojis: ['😀', '😎', '🙌'] },
    { id: 2, year: 2007, description: 'Emoji support on the iPhone', emojis: ['📱', '👏', '🎉'] },
    { id: 3, year: 2010, description: 'Unicode Standard includes emojis', emojis: ['🔤', '🆕', '🔣'] },
    { id: 4, year: 2011, description: 'Emoji on Android devices', emojis: ['🤖', '📱', '👾'] },
    { id: 5, year: 2015, description: 'Emoji diversity introduced', emojis: ['🌍', '👩‍🦱', '👨‍🦳'] },
    { id: 6, year: 2020, description: 'New emojis added to Unicode 13.0', emojis: ['🆕', '📅', '🎉'] },
    { id: 7, year: 2021, description: 'Emoji 13.1 Release', emojis: ['🆕', '📆', '🚀'] },
    { id: 8, year: 2022, description: 'Meta introduces new emojis for Facebook', emojis: ['👍', '❤️', '😆'] },
    { id: 9, year: 2023, description: 'Emoji 14.0 Release', emojis: ['🆕', '📆', '🌟'] },
    { id: 10, year: 2025, description: 'Global Emoji Day established to celebrate the impact of emojis on communication.', emojis: ['🌎', '📅', '🎉'] },
    { id: 11, year: 2030, description: 'AI-powered emojis become mainstream, adapting to user emotions in real-time.', emojis: ['🤖', '🧑‍💻', '😊'] },
    // Add more events
  ];

  return (
   <>
     <section>

         {/* Hero content */}
         <div className="superhero-content">

           {/* Section header */}
           <div className="superhero-header">
             <h1 className="superhero-h1" data-aos="fade-up">Express your Emotions with style</h1>
             <p className="superhero-p" data-aos="fade-up" data-aos-delay="200">Whether it is to celebrate parties and special occasions or to create a realtionship with the person you're interested in, We have an All-in-One solution for you.</p>
             <div className="superhero-section">
               <div data-aos="fade-up" data-aos-delay="400">
                 <Link to="/emoji" className="superhero-a bg-purple-600 hover\:bg-purple-700:hover w-full mb-4 sm:w-auto">
                   Start My Story
                 </Link> 
               </div>
               <div data-aos="fade-up" data-aos-delay="600">
                 <Link to="/analyze" className="superhero-b bg-gray-700 hover\:bg-gray-800:hover">
                   Analyze Instead
                 </Link>
               </div>
             </div>
           </div>
         </div>
    </section>
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Unlimited Words, One Story</h1>
            <p className="text-xl text-gray-400">You can convert unlimited words to make your perfect story that will perfectly express your emotions.</p>
          </div>
          
            {/* 1st item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src="/banner-card.png" alt="Features 01" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">More Results. Less Effort</div>
                  <h3 className="h3 mb-3">Express Anything in your own Style</h3>
                  <p className="text-xl text-gray-400 mb-4">With 5000+ Datasets on your choosen words, You can create your own story or create an easy text sticker of your choice</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>5000+ Words filter</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>50+ Filter Effects</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Choose your background</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
    <h1>History of Emojis</h1>
    <Timeline events={events} />
    <div className="tour-card text-center">
      <div className="tour-card-header">
        Featured
      </div>
      <div className="tour-card-body">
        <h5 className="tour-card-title">Virtual Tour</h5>
        <p className="tour-card-text">Learn, Enjoy and Embrace the traditions of the world that we are all living in ✳️</p>
        <Link to="/tour" className="tour-btn btn-primary">
          Start Exploring
        </Link> 
      </div>
     </div>
   </>
  )
}