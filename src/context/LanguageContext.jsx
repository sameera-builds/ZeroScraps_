import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  English: {
    // Navbar
    home: "Home",
    ngoBoard: "NGO Board",
    retailer: "Retailer",
    map: "Map",
    analytics: "Analytics",
    signIn: "Sign In",

    // Home
    badge: "Smart India Hackathon MVP",
    heroTitle1: "Turn surplus food into",
    heroTitle2: "shared meals.",
    heroDescription:
      "ZeroScraps connects retailers with NGOs to reduce food waste and route surplus food to communities that need it.",
    retailerPortal: "Open Retailer Portal",
    exploreMap: "Explore Map",

    activeListings: "Active Listings",
    unitsRescued: "Units Rescued",
    estimatedMeals: "Estimated Meals",
    partnerNGOs: "Partner NGOs",

    availableSurplus: "Available surplus",
    foodSaved: "Food saved",
    mealsSupported: "Meals supported",
    activePartners: "Active partners",

    howItWorks: "HOW IT WORKS",
    howLoopCloses: "From surplus to shared meals",
    step1Title: "Retailers list surplus",
    step1Text:
      "Retailers add food that is nearing expiry or is no longer needed.",
    step2Title: "AI identifies urgency",
    step2Text:
      "Our system evaluates quantity, expiry and risk to prioritize food rescue.",
    step3Title: "NGOs discover food",
    step3Text:
      "Nearby NGOs can discover available surplus food through the platform.",
    step4Title: "Food gets claimed",
    step4Text:
      "NGOs claim suitable donations and coordinate the pickup.",
    step5Title: "Communities receive meals",
    step5Text:
      "Rescued food reaches people who need it instead of becoming waste.",
  },

  हिन्दी: {
    // Navbar
    home: "होम",
    ngoBoard: "एनजीओ बोर्ड",
    retailer: "रिटेलर",
    map: "मानचित्र",
    analytics: "विश्लेषण",
    signIn: "साइन इन",

    // Home
    badge: "स्मार्ट इंडिया हैकाथॉन MVP",
    heroTitle1: "अतिरिक्त भोजन को बदलें",
    heroTitle2: "साझा भोजन में।",
    heroDescription:
      "ZeroScraps खुदरा विक्रेताओं को NGO से जोड़ता है ताकि भोजन की बर्बादी कम हो और अतिरिक्त भोजन जरूरतमंद समुदायों तक पहुंचाया जा सके।",
    retailerPortal: "रिटेलर पोर्टल खोलें",
    exploreMap: "मानचित्र देखें",

    activeListings: "सक्रिय लिस्टिंग",
    unitsRescued: "बचाई गई इकाइयाँ",
    estimatedMeals: "अनुमानित भोजन",
    partnerNGOs: "साझेदार NGO",

    availableSurplus: "उपलब्ध अतिरिक्त भोजन",
    foodSaved: "बचाया गया भोजन",
    mealsSupported: "समर्थित भोजन",
    activePartners: "सक्रिय साझेदार",

    howItWorks: "यह कैसे काम करता है",
    howLoopCloses: "अतिरिक्त भोजन से साझा भोजन तक",
    step1Title: "रिटेलर अतिरिक्त भोजन सूचीबद्ध करते हैं",
    step1Text:
      "रिटेलर ऐसे भोजन को सूचीबद्ध करते हैं जिसकी समय सीमा समाप्त होने वाली है या जिसकी आवश्यकता नहीं है।",
    step2Title: "AI प्राथमिकता तय करता है",
    step2Text:
      "हमारी प्रणाली मात्रा, समाप्ति समय और जोखिम का विश्लेषण करके भोजन बचाने की प्राथमिकता तय करती है।",
    step3Title: "NGO भोजन खोजते हैं",
    step3Text:
      "नजदीकी NGO प्लेटफॉर्म के माध्यम से उपलब्ध अतिरिक्त भोजन खोज सकते हैं।",
    step4Title: "भोजन का दावा किया जाता है",
    step4Text:
      "NGO उपयुक्त दान का दावा करते हैं और भोजन लेने की व्यवस्था करते हैं।",
    step5Title: "समुदायों तक भोजन पहुंचता है",
    step5Text:
      "बचाया गया भोजन जरूरतमंद लोगों तक पहुंचता है और बर्बाद होने से बचता है।",
  },

  বাংলা: {
    // Navbar
    home: "হোম",
    ngoBoard: "এনজিও বোর্ড",
    retailer: "রিটেইলার",
    map: "মানচিত্র",
    analytics: "বিশ্লেষণ",
    signIn: "সাইন ইন",

    // Home
    badge: "স্মার্ট ইন্ডিয়া হ্যাকাথন MVP",
    heroTitle1: "অতিরিক্ত খাবারকে পরিণত করুন",
    heroTitle2: "ভাগ করা খাবারে।",
    heroDescription:
      "ZeroScraps খুচরা বিক্রেতাদের NGO-দের সাথে যুক্ত করে খাদ্যের অপচয় কমায় এবং অতিরিক্ত খাবার প্রয়োজনীয় সম্প্রদায়ের কাছে পৌঁছে দেয়।",
    retailerPortal: "রিটেইলার পোর্টাল খুলুন",
    exploreMap: "মানচিত্র দেখুন",

    activeListings: "সক্রিয় তালিকা",
    unitsRescued: "উদ্ধার করা ইউনিট",
    estimatedMeals: "আনুমানিক খাবার",
    partnerNGOs: "অংশীদার NGO",

    availableSurplus: "উপলব্ধ অতিরিক্ত খাবার",
    foodSaved: "সংরক্ষিত খাবার",
    mealsSupported: "সহায়তাপ্রাপ্ত খাবার",
    activePartners: "সক্রিয় অংশীদার",

    howItWorks: "এটি কীভাবে কাজ করে",
    howLoopCloses: "অতিরিক্ত খাবার থেকে ভাগ করা খাবার",
    step1Title: "রিটেইলাররা অতিরিক্ত খাবার তালিকাভুক্ত করে",
    step1Text:
      "রিটেইলাররা মেয়াদ শেষ হওয়ার কাছাকাছি বা প্রয়োজন নেই এমন খাবার তালিকাভুক্ত করে।",
    step2Title: "AI জরুরি অবস্থা শনাক্ত করে",
    step2Text:
      "আমাদের সিস্টেম পরিমাণ, মেয়াদ এবং ঝুঁকি বিশ্লেষণ করে খাবার উদ্ধারের অগ্রাধিকার নির্ধারণ করে।",
    step3Title: "NGO খাবার খুঁজে পায়",
    step3Text:
      "কাছাকাছি NGO প্ল্যাটফর্মের মাধ্যমে উপলব্ধ অতিরিক্ত খাবার খুঁজে পেতে পারে।",
    step4Title: "খাবারের দাবি করা হয়",
    step4Text:
      "NGO উপযুক্ত দানের দাবি করে এবং খাবার সংগ্রহের ব্যবস্থা করে।",
    step5Title: "সম্প্রদায়ের কাছে খাবার পৌঁছে যায়",
    step5Text:
      "উদ্ধার করা খাবার প্রয়োজনীয় মানুষের কাছে পৌঁছে যায় এবং অপচয় থেকে রক্ষা পায়।",
  },

  தமிழ்: {
    // Navbar
    home: "முகப்பு",
    ngoBoard: "NGO வாரியம்",
    retailer: "சில்லறை விற்பனையாளர்",
    map: "வரைபடம்",
    analytics: "பகுப்பாய்வு",
    signIn: "உள்நுழைய",

    // Home
    badge: "ஸ்மார்ட் இந்தியா ஹேக்கத்தான் MVP",
    heroTitle1: "உபரி உணவை மாற்றுங்கள்",
    heroTitle2: "பகிரப்பட்ட உணவாக.",
    heroDescription:
      "ZeroScraps சில்லறை விற்பனையாளர்களை NGO-களுடன் இணைத்து உணவு வீணாவதை குறைக்கிறது மற்றும் உபரி உணவை தேவையான சமூகங்களுக்கு கொண்டு செல்கிறது.",
    retailerPortal: "சில்லறை போர்ட்டலைத் திறக்கவும்",
    exploreMap: "வரைபடத்தைப் பார்க்கவும்",

    activeListings: "செயலில் உள்ள பட்டியல்கள்",
    unitsRescued: "மீட்கப்பட்ட அலகுகள்",
    estimatedMeals: "மதிப்பிடப்பட்ட உணவுகள்",
    partnerNGOs: "கூட்டாளர் NGOகள்",

    availableSurplus: "கிடைக்கும் உபரி உணவு",
    foodSaved: "சேமிக்கப்பட்ட உணவு",
    mealsSupported: "ஆதரிக்கப்பட்ட உணவுகள்",
    activePartners: "செயலில் உள்ள கூட்டாளர்கள்",

    howItWorks: "இது எப்படி செயல்படுகிறது",
    howLoopCloses: "உபரி உணவிலிருந்து பகிரப்பட்ட உணவு வரை",
    step1Title: "சில்லறை விற்பனையாளர்கள் உபரி உணவை பட்டியலிடுகின்றனர்",
    step1Text:
      "காலாவதியாகும் நிலையில் உள்ள அல்லது தேவையில்லாத உணவை சில்லறை விற்பனையாளர்கள் பட்டியலிடுகின்றனர்.",
    step2Title: "AI அவசரத்தைக் கண்டறிகிறது",
    step2Text:
      "எங்கள் அமைப்பு அளவு, காலாவதி மற்றும் ஆபத்தை மதிப்பிட்டு உணவு மீட்புக்கு முன்னுரிமை அளிக்கிறது.",
    step3Title: "NGOகள் உணவைக் கண்டறிகின்றனர்",
    step3Text:
      "அருகிலுள்ள NGOகள் தளத்தின் மூலம் கிடைக்கும் உபரி உணவைக் கண்டறியலாம்.",
    step4Title: "உணவு கோரப்படுகிறது",
    step4Text:
      "NGOகள் பொருத்தமான நன்கொடைகளை கோரி உணவை எடுத்துச் செல்ல ஏற்பாடு செய்கின்றனர்.",
    step5Title: "சமூகங்களுக்கு உணவு கிடைக்கிறது",
    step5Text:
      "மீட்கப்பட்ட உணவு தேவைப்படும் மக்களை சென்றடைகிறது மற்றும் வீணாவதைத் தடுக்கிறது.",
  },

  తెలుగు: {
    // Navbar
    home: "హోమ్",
    ngoBoard: "NGO బోర్డు",
    retailer: "రిటైలర్",
    map: "మ్యాప్",
    analytics: "విశ్లేషణ",
    signIn: "సైన్ ఇన్",

    // Home
    badge: "స్మార్ట్ ఇండియా హ్యాకథాన్ MVP",
    heroTitle1: "మిగిలిన ఆహారాన్ని మార్చండి",
    heroTitle2: "పంచుకున్న భోజనంగా.",
    heroDescription:
      "ZeroScraps రిటైలర్లను NGOలతో కలిపి ఆహార వ్యర్థాలను తగ్గిస్తుంది మరియు మిగిలిన ఆహారాన్ని అవసరమైన సమాజాలకు చేరుస్తుంది.",
    retailerPortal: "రిటైలర్ పోర్టల్ తెరవండి",
    exploreMap: "మ్యాప్ చూడండి",

    activeListings: "క్రియాశీల జాబితాలు",
    unitsRescued: "రక్షించబడిన యూనిట్లు",
    estimatedMeals: "అంచనా భోజనాలు",
    partnerNGOs: "భాగస్వామ్య NGOలు",

    availableSurplus: "అందుబాటులో ఉన్న మిగులు ఆహారం",
    foodSaved: "సేవ్ చేసిన ఆహారం",
    mealsSupported: "మద్దతు పొందిన భోజనాలు",
    activePartners: "క్రియాశీల భాగస్వాములు",

    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    howLoopCloses: "మిగిలిన ఆహారం నుండి పంచుకున్న భోజనం వరకు",
    step1Title: "రిటైలర్లు మిగిలిన ఆహారాన్ని జాబితా చేస్తారు",
    step1Text:
      "గడువు ముగియబోతున్న లేదా అవసరం లేని ఆహారాన్ని రిటైలర్లు జాబితా చేస్తారు.",
    step2Title: "AI అత్యవసరతను గుర్తిస్తుంది",
    step2Text:
      "మా సిస్టమ్ పరిమాణం, గడువు మరియు ప్రమాదాన్ని విశ్లేషించి ఆహార రక్షణకు ప్రాధాన్యత ఇస్తుంది.",
    step3Title: "NGOలు ఆహారాన్ని కనుగొంటాయి",
    step3Text:
      "సమీపంలోని NGOలు ప్లాట్‌ఫారమ్ ద్వారా అందుబాటులో ఉన్న మిగిలిన ఆహారాన్ని కనుగొనవచ్చు.",
    step4Title: "ఆహారాన్ని క్లెయిమ్ చేస్తారు",
    step4Text:
      "NGOలు సరైన విరాళాలను క్లెయిమ్ చేసి ఆహారాన్ని తీసుకెళ్లడానికి ఏర్పాట్లు చేస్తాయి.",
    step5Title: "సమాజాలకు భోజనం అందుతుంది",
    step5Text:
      "రక్షించిన ఆహారం అవసరమైన ప్రజలకు చేరుతుంది మరియు వ్యర్థం కాకుండా కాపాడబడుతుంది.",
  },

  मराठी: {
    // Navbar
    home: "मुख्यपृष्ठ",
    ngoBoard: "NGO बोर्ड",
    retailer: "रिटेलर",
    map: "नकाशा",
    analytics: "विश्लेषण",
    signIn: "साइन इन",

    // Home
    badge: "स्मार्ट इंडिया हॅकाथॉन MVP",
    heroTitle1: "अतिरिक्त अन्नाचे रूपांतर करा",
    heroTitle2: "सामायिक जेवणात.",
    heroDescription:
      "ZeroScraps किरकोळ विक्रेत्यांना NGO सोबत जोडते आणि अन्नाची नासाडी कमी करून अतिरिक्त अन्न गरजू समुदायांपर्यंत पोहोचवते.",
    retailerPortal: "रिटेलर पोर्टल उघडा",
    exploreMap: "नकाशा पहा",

    activeListings: "सक्रिय सूची",
    unitsRescued: "वाचवलेल्या युनिट्स",
    estimatedMeals: "अंदाजे जेवणे",
    partnerNGOs: "भागीदार NGO",

    availableSurplus: "उपलब्ध अतिरिक्त अन्न",
    foodSaved: "वाचवलेले अन्न",
    mealsSupported: "समर्थित जेवणे",
    activePartners: "सक्रिय भागीदार",

    howItWorks: "हे कसे कार्य करते",
    howLoopCloses: "अतिरिक्त अन्नापासून सामायिक जेवणापर्यंत",
    step1Title: "रिटेलर अतिरिक्त अन्नाची नोंद करतात",
    step1Text:
      "रिटेलर कालबाह्य होण्याच्या जवळ असलेले किंवा आवश्यक नसलेले अन्न सूचीबद्ध करतात.",
    step2Title: "AI तातडी ओळखते",
    step2Text:
      "आमची प्रणाली प्रमाण, कालबाह्यता आणि जोखीम तपासून अन्न बचावाला प्राधान्य देते.",
    step3Title: "NGO अन्न शोधतात",
    step3Text:
      "जवळील NGO प्लॅटफॉर्मद्वारे उपलब्ध अतिरिक्त अन्न शोधू शकतात.",
    step4Title: "अन्नाचा दावा केला जातो",
    step4Text:
      "NGO योग्य देणग्यांचा दावा करतात आणि अन्न घेऊन जाण्याची व्यवस्था करतात.",
    step5Title: "समुदायांना जेवण मिळते",
    step5Text:
      "वाचवलेले अन्न गरजू लोकांपर्यंत पोहोचते आणि वाया जाण्यापासून वाचते.",
  },

  ગુજરાતી: {
    // Navbar
    home: "હોમ",
    ngoBoard: "NGO બોર્ડ",
    retailer: "રિટેલર",
    map: "નકશો",
    analytics: "વિશ્લેષણ",
    signIn: "સાઇન ઇન",

    // Home
    badge: "સ્માર્ટ ઇન્ડિયા હેકાથોન MVP",
    heroTitle1: "વધારાના ખોરાકને બદલો",
    heroTitle2: "વહેંચાયેલા ભોજનમાં.",
    heroDescription:
      "ZeroScraps રિટેલર્સને NGO સાથે જોડે છે અને ખોરાકનો બગાડ ઘટાડીને વધારાનો ખોરાક જરૂરિયાતમંદ સમુદાયો સુધી પહોંચાડે છે.",
    retailerPortal: "રિટેલર પોર્ટલ ખોલો",
    exploreMap: "નકશો જુઓ",

    activeListings: "સક્રિય સૂચિઓ",
    unitsRescued: "બચાવેલા યુનિટ્સ",
    estimatedMeals: "અંદાજિત ભોજન",
    partnerNGOs: "ભાગીદાર NGO",

    availableSurplus: "ઉપલબ્ધ વધારાનો ખોરાક",
    foodSaved: "બચાવેલો ખોરાક",
    mealsSupported: "સમર્થિત ભોજન",
    activePartners: "સક્રિય ભાગીદારો",

    howItWorks: "આ કેવી રીતે કાર્ય કરે છે",
    howLoopCloses: "વધારાના ખોરાકથી વહેંચાયેલા ભોજન સુધી",
    step1Title: "રિટેલર્સ વધારાનો ખોરાક સૂચિબદ્ધ કરે છે",
    step1Text:
      "રિટેલર્સ એવો ખોરાક સૂચિબદ્ધ કરે છે જેની સમયસીમા નજીક છે અથવા જેની જરૂર નથી.",
    step2Title: "AI તાકીદ ઓળખે છે",
    step2Text:
      "અમારી સિસ્ટમ જથ્થો, સમયસીમા અને જોખમનું વિશ્લેષણ કરીને ખોરાક બચાવને પ્રાથમિકતા આપે છે.",
    step3Title: "NGO ખોરાક શોધે છે",
    step3Text:
      "નજીકના NGO પ્લેટફોર્મ દ્વારા ઉપલબ્ધ વધારાનો ખોરાક શોધી શકે છે.",
    step4Title: "ખોરાકનો દાવો કરવામાં આવે છે",
    step4Text:
      "NGO યોગ્ય દાનનો દાવો કરે છે અને ખોરાક લેવા માટે વ્યવસ્થા કરે છે.",
    step5Title: "સમુદાયોને ભોજન મળે છે",
    step5Text:
      "બચાવેલો ખોરાક જરૂરિયાતમંદ લોકો સુધી પહોંચે છે અને બગાડથી બચાવવામાં આવે છે.",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("English");

  const changeLanguage = (nextLanguage) => {
    if (translations[nextLanguage]) {
      setLanguage(nextLanguage);
    }
  };

  const t = translations[language] || translations.English;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        changeLanguage,
        t,
        translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}