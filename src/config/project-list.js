const projectList = {
  projects: [
    {
      id: 'home',
      title: 'About Us',
      subtitle: 'About us',
      description: '<div>The true sign of intelligence is not knowledge but imagination. While the competitions at Kshitij prove to be the ultimate test of grit, knowledge and skill, the guest lectures and workshops provide an enriching experience for the avid learners. The fest has been graced by the presence of such luminaries who are looked up to for their distinguished contribution in their respective fields. The upcoming 16th edition is going to be held from 18th-20th January 2019.Our glorious journey has been recognized by UNESCO, UNICEF, SAYEN and CEE as they offered us their patronage and appreciated our efforts by associating with our social initiatives.Above all, with over 60,000 participation per year and a prize money of over INR 4.5 million, it is the Asia\'s largest Techno-Management Symposium.<br><br><a target="_blank" rel="noopener noreferrer" href="https://youtu.be/ye7h0eV3iHU"><center>Click here for After Movie \'18</center></a></div>',
      date: '18-20th Jan 2019',
      link: 'Our Team',
      //url: '',
   
      medias: [
        
      ],
    },
    {
      id: 'events',
      title: 'Events',
      subtitle: 'Events',
      description: 'Buckle your belts and sharpen your wits because you would just require too much of it to win the events of Asia\'s largest techno-management symposium where the competitions can get as challenging as the aura suggests.Coming Soon, visit again for further updates!',
      date: '18-20th Jan 2019',
      link: 'Our Team',
      
      // total: '<div></div>',
      // technologies: '<div></div><div></div>',
      // clients: null,
      // awards: '<div><a href="" target="_blank"></a></div><div><a href="" target="_blank"></a></div>',
      medias: [
        { type: 'image', url: 'images/projects/resn-little-helper/genesis.png', nameid:'one_g'},
        { type: 'image', url: 'images/projects/resn-little-helper/gamefest.jpg', nameid:'ten_g'},
        { type: 'image', url: 'images/projects/resn-little-helper/quizzard.png', nameid: 'seven_g' },
        { type: 'image', url: 'images/projects/resn-little-helper/conceptualize.png', nameid: 'eight_g' },

        { type: 'image', url: 'images/projects/resn-little-helper/codeconclave.png', nameid: 'three_g' },
        { type: 'image', url: 'images/projects/resn-little-helper/robotics.png', nameid: 'four_g' },
        { type: 'image', url: 'images/projects/resn-little-helper/mechanize.png', nameid:'two_g'},
        
        { type: 'image', url: 'images/projects/resn-little-helper/strategia.png', nameid: 'five_g' },
        { type: 'image', url: 'images/projects/resn-little-helper/ibm.png', nameid: 'nine_g' },
        { type: 'image', url: 'images/projects/resn-little-helper/tech4fun.png', nameid:'six_g'},

        { type: 'image', url: 'images/projects/resn-little-helper/gamefest.jpg', nameid: 'ten_g' },
      ],
    },
    {
      id: 'workshops',
      title: 'Workshops',
      subtitle: 'Workshops',
      description: 'Do you want to try doing something that authentic companies actually work on? Engage yourself in the compelling workshops conducted by the leading tech giants of the world.Will be released soon, stay in touch!',
      date: '18-20th Jan 2019',
      link: 'Our Team',
      
      
      medias: [
        { type: 'image', url: 'images/projects/hp/netapp.jpg', nameid:'one_work' },
        { type: 'image', url: 'images/projects/hp/sebi.jpg', nameid:'two_work' },
        { type: 'image', url: 'images/projects/hp/canon.jpg', nameid: 'three_work' },
      ],
    },
    
    {
      id: 'guestlectures',
      title: 'Guest Lectures',
      subtitle: 'Guset Lectures',
      description: 'Every leader has people they look up to, people who have accomplished great feats and whose stories are hands down an inspiration. Here is all the inspiration you need, an ingenuity inhibiting session by great achievers all around the globe.Will be released soon, stay in touch!',
      date: '18-20th Jan 2019',
      link: 'Our Team',
      
     
      medias: [
        { type: 'image', url: 'images/projects/tsuki8/soonimg.png' },
       
       
      ],
    },
    {
      id: 'megashows',
      title: 'Megashows',
      subtitle: 'Megashows',
      description: 'When the heart pounds with excitement, your blood filled with the zeal and your eyes reflecting the bright colours of the warm air, there comes the showstopper to make your visit more memorable than ever with their charisma.Will be released soon, stay in touch!',
      date: '18-20th Jan 2019',
      link: 'Our Team',
     
     
      medias: [
        { type: 'image', url: 'images/projects/speedfactory/soonimg.png' },
       /*
        */
      ],
    },
    {
      id: 'exhibitions',
      title: 'Exhibitions',
      subtitle: 'Exhibitions',
      description: 'The world is far forward then we actually think. Latest technological development in all fields across the world is displayed in form of exhibitions. Get ready to witness the advancement and interact with humanoid technologies.Will be released soon, stay in touch!',
      date: '18-20th Jan 2019',
      link: 'Our Team',
     
      medias: [
        { type: 'image', url: 'images/projects/nmd/soonimg.png' },
       ],
    },
    {
      id: 'informals',
      title: 'Informals',
      subtitle: 'Informals',
      description: 'Will be released soon, stay in touch!',
      date: '18-20th Jan 2019',
      link: 'Our Team',
     
      medias: [
        { type: 'image', url: 'images/projects/lusine/soonimg.png' },
       ],
    },
    {
      id: 'socialinit',
      title: 'Social Initiatives',
      subtitle: 'Social Initiative',
      description: 'Will be released soon, stay in touch!',
      date: '18-20th Jan 2019',
      link: 'Our Team',
     
      medias: [
        { type: 'image', url: 'images/projects/lusine/soonimg.png' },
       ],
    },
    
  ],

  getProject(id) {
    return projectList.projects.find( project => project.id === id );
  },

};

module.exports = projectList;
