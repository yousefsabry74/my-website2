let mode = localStorage.getItem("mode");
let section = parseInt(localStorage.getItem("section") || "1");
let totalSections = 5; 
let currentIndex = 0;
let timeLeft = 25 * 60; 

// استرجاع الأسئلة من التخزين المؤقت إذا كانت موجودة
let savedQuestions = localStorage.getItem("questions");
if (savedQuestions) {
  questions = JSON.parse(savedQuestions);
  localStorage.removeItem("questions");
} else {
  // مصفوفة الأسئلة الجديدة (114 سؤالاً مع الفقرات وتعديل الكسور)
  questions = [
    // المفردة الشاذة (1-7)
    { id: 1, text: "أوجد المفردة الشاذة:", options: ["ثمار", "حبوب", "حصاد", "فواكه"], answer: null, marked: false, correct: 2, explanation: "حصاد هو عملية، بينما البقية هي نواتج زراعية.", description: "المفردة الشاذة" },
    { id: 2, text: "أوجد المفردة الشاذة:", options: ["شمس", "قمر", "نور", "الإضاءة"], answer: null, marked: false, correct: 3, explanation: "الإضاءة هي فعل، بينما البقية مصادر طبيعية." },
    { id: 3, text: "أوجد المفردة الشاذة:", options: ["مسك", "نعناع", "فل", "ياسمين"], answer: null, marked: false, correct: 0, explanation: "المسك حيواني الأصل، بينما البقية نباتات عطرية." },
    { id: 4, text: "أوجد المفردة الشاذة:", options: ["سعي", "طواف", "حج", "رمي"], answer: null, marked: false, correct: 2, explanation: "الحج هو الفريضة الكلية، بينما البقية مناسك." },
    { id: 5, text: "أوجد المفردة الشاذة:", options: ["رغبة", "رهبة", "خشية", "فزع"], answer: null, marked: false, correct: 0, explanation: "الرغبة شعور إيجابي، بينما البقية أنواع من الخوف." },
    { id: 6, text: "أوجد المفردة الشاذة:", options: ["كسور", "كدمات", "جروح", "كمادات"], answer: null, marked: false, correct: 3, explanation: "الكمادات هي أداة علاج، بينما البقية إصابات." },
    { id: 7, text: "أوجد المفردة الشاذة:", options: ["أفقي", "عمودي", "رأسي", "مائل"], answer: null, marked: false, correct: 3, explanation: "مائل مختلف عن الزوايا الأساسية." },

    // التناظر اللفظي (8-13)
    { id: 8, text: "سوريا : دمشق (دولة : عاصمة)", options: ["فلسطين : غزة", "مصر : الإسكندرية", "المغرب : الرباط", "لبنان : طرابلس"], answer: null, marked: false, correct: 2, explanation: "المغرب : الرباط هي علاقة دولة وعاصمتها.", description: "التناظر اللفظي" },
    { id: 9, text: "مغزل : مقص (أدوات عمل)", options: ["جزار : منجرة", "معلم : مسطرة", "دراجة : عجلة", "منشار : مسمار"], answer: null, marked: false, correct: 3, explanation: "المغزل والمقص أدوات نسيج، والمنشار والمسمار أدوات بناء/نجارة." },
    { id: 10, text: "ورد : عطر (مصدر : ناتج)", options: ["زهرة : لون", "إنفاق : إسراف", "رمل : زجاج", "خزان : ماء"], answer: null, marked: false, correct: 2, explanation: "الورد يُستخرج منه العطر، والرمل يُصنع منه الزجاج." },
    { id: 11, text: "وعاء : قدر (مرادفات)", options: ["أواني : نحاس", "شاحنة : سيارة", "صحن : دلو", "زنجبيل : بهار"], answer: null, marked: false, correct: 2, explanation: "الوعاء هو القدر، والصحن هو الدلو (من أدوات حفظ السوائل)." },
    { id: 12, text: "ريح : إعصار (درجة قصوى)", options: ["فل : ياسمين", "ليل : نهار", "نجاح : عمل", "حرب : ضروس"], answer: null, marked: false, correct: 3, explanation: "الإعصار هو درجة قوية من الريح، والضروس هي درجة قوية من الحرب." },
    { id: 13, text: "حذاء : إنسان (حماية)", options: ["ظلف : خروف", "حذوة : حصان", "خاتم : ذهب", "قدم : خلخال"], answer: null, marked: false, correct: 1, explanation: "الحذاء للإنسان، والحذوة للحصان (حماية القدم)." },

    // إكمال الجمل (14-20)
    { id: 14, text: "احذر من ......... إذا مازحته ومن ......... إذا عاشرته.", options: ["الأرعن - السافل", "الكريم - اللئيم", "الحاقد - الحسود", "الذكي - الغبي"], answer: null, marked: false, correct: 0, explanation: "الأرعن يسيء المزاح، والسافل يظهر سوء خلقه في المعاشرة.", description: "إكمال الجمل" },
    { id: 15, text: "الموت جوعاً أشرف من أن تكون عبداً.....", options: ["قوياً", "مطيعاً", "متخماً", "سيئاً"], answer: null, marked: false, correct: 2, explanation: "متخماً تعني ممتلئاً بالطعام (تفضيل الشرف على الذل حتى مع الشبع)." },
    { id: 16, text: "من اتكل في ...... على زاد غيره طال .....", options: ["علمه – تعبه", "سفره – جوعه", "حزنه – شبعه", "حضره – خطره"], answer: null, marked: false, correct: 1, explanation: "زاد السفر يؤدي إلى الجوع عند الاعتماد على الغير." },
    { id: 17, text: "سارع إلى الناس بما ..... حتى لا يقولون عنك مالا ......... ", options: ["يحبون – يجهلون", "يحبون – يفعلون", "يكرهون – يعملون", "تريد – تعلم"], answer: null, marked: false, correct: 0, explanation: "افعل ما يحبون لئلا يجهلوا حقيقتك ويقولوا ما ليس فيك." },
    { id: 18, text: "إن ...... لب الجسد إذا صلح ....... الجسد", options: ["القلب - ربع", "القلب - سائر", "الرئتين - باقي", "الدماغ - كل"], answer: null, marked: false, correct: 1, explanation: "القلب هو لب الجسد، وصلاحه يؤدي لصلاح سائر الجسد." },
    { id: 19, text: "السبب في ......... إما أن تكون غبياً وإما أن تكون .........", options: ["النجاح - ذكياً", "الفشل - متكاسلاً", "السعادة - متفائلاً", "التعاسة - حزيناً"], answer: null, marked: false, correct: 1, explanation: "الفشل سببه إما الغباء وإما الكسل." },
    { id: 20, text: "لكي تكون رؤيتك ...... للأمور عليك تغيير ..... ", options: ["ثاقبة - حكمك", "حصيفة - نظرتك", "مهمة - أفكارك", "جيدة - نفسك"], answer: null, marked: false, correct: 1, explanation: "الرؤية الحصيفة تتطلب تغيير النظرة للأمور." },

    // الخطأ السياقي (21-24)
    { id: 21, text: "الحب قادر على بعث اسوأ المشاعر وأكثرها ألما", options: ["بعث", "اسوأ", "المشاعر", "ألما"], answer: null, marked: false, correct: 0, explanation: "الخطأ هو **بعث**، والصحيح **إثارة**.", description: "الخطأ السياقي" },
    { id: 22, text: "رأس العقل التدبير في الإنفاق دون بذل", options: ["رأس", "العقل", "الإنفاق", "بذل"], answer: null, marked: false, correct: 3, explanation: "الخطأ هو **بذل**، والصحيح **إسراف** (التدبير عكس الإسراف)." },
    { id: 23, text: "سأل الممكن الأمل أين تقيم، فأجاب في أحلام العاجز", options: ["الأمل", "يقيم", "أحلام", "العاجز"], answer: null, marked: false, correct: 0, explanation: "الخطأ هو **الأمل**، والصحيح **المستحيل**." },
    { id: 24, text: "كل شيء إذا قل رخص إلا العلم إذا كثر غلا", options: ["قل", "رخص", "العلم", "غلا"], answer: null, marked: false, correct: 0, explanation: "الخطأ هو **قل**، والصحيح **كثر**." },

    // استيعاب المقروء: الجدري (25-30)
    { id: 25, text: "يتعدل مجموع معدلي الحضانة الجدري (12 يومًا) والجديري (14-21 يومًا) من:", options: ["7 إلى 14 يوم", "14 إلى 21 يوم", "26 إلى 33 يوم", "من 1 إلى 7 أيام"], answer: null, marked: false, correct: 2, explanation: "المجموع الأدنى 12+14=26، والأقصى 12+21=33.", description: "استيعاب المقروء - الجدري والجديري" },
    { id: 26, text: "مرض الجديري يعد:", options: ["مرض جلدي", "مرض تناسلي", "مرض جذعي", "مرض باطني"], answer: null, marked: false, correct: 0, explanation: "مرض جلدي (بسبب الطفح)." },
    { id: 27, text: "يمكن أن يصاب الشخص في عمر:", options: ["13 سنة", "15 سنة", "18 سنة", "19 سنة"], answer: null, marked: false, correct: 0, explanation: "13 سنة (يكثر بين الأطفال)." },
    { id: 28, text: "في أي مكان يظهر طفح الجدري الصادق؟", options: ["الوجه", "اليدين", "البطن", "الجذع"], answer: null, marked: false, correct: 0, explanation: "الجدري يظهر أولاً على الوجه." },
    { id: 29, text: "عند الإصابة بالجديري تظهر الأعراض في خلال:", options: ["يومان", "3 ايام", "يوم", "4 ساعات"], answer: null, marked: false, correct: 1, explanation: "يتأخر ظهور الطفح حتى اليوم الثالث أو الرابع." },
    { id: 30, text: "في أي يوم يظهر الجدري؟", options: ["اليوم الأول", "اليوم الثاني", "اليوم الثالث", "اليوم الرابع"], answer: null, marked: false, correct: 0, explanation: "الجدري يظهر في اليوم الأول." },

    // استيعاب المقروء: حشرة السمك (31-35)
    { id: 31, text: "ما هي الأماكن التي تكثر فيها حشرة السمك؟", options: ["الشقوق", "الأماكن الندية", "الأماكن الضيقة", "الأماكن المظلمة"], answer: null, marked: false, correct: 1, explanation: "الأماكن الندية (الرطبة/المبللة).", description: "استيعاب المقروء - حشرة السمك" },
    { id: 32, text: "أين تضع حشرة السمك بيضها؟", options: ["الأماكن التي يكثر فيها العفن", "في المحيطات", "الشقوق (الأماكن الضيقة)", "في البحيرات"], answer: null, marked: false, correct: 2, explanation: "تضع بيوضها في الشقوق." },
    { id: 33, text: "ما أسلم طريقة للتخلص من حشرة السمك والأكثر أماننًا؟", options: ["المبيدات الحشرية", "العناية بالنظافة بشكل مستمر", "بودرة سامة", "المواد المبللة"], answer: null, marked: false, correct: 1, explanation: "العناية بالنظافة بشكل مستمر (أسلم الطرق)." },
    { id: 34, text: "لماذا تأكل حشرة السمك السجاجيد؟", options: ["لأنها تكون مبللة", "لجوعها", "لعدم نظافتها (لأنها تكون متسخة)", "لأنها تكون عفنة"], answer: null, marked: false, correct: 2, explanation: "لأنها تكون متسخة (تتغذى على الأقمشة المتسخة)." },
    { id: 35, text: "أي مما يلي لا يتوافق مع النص؟", options: ["حشرة السمك تمشي بسرعة وأكلها بطيء", "تكثر حشرة السمك في الأماكن المبللة", "تكثر في الأماكن قليلة الحركة", "تأكل حشرة السمك الستائر غير النظيفة"], answer: null, marked: false, correct: 0, explanation: "لم يذكر النص سرعة أكلها." },

    // استيعاب المقروء: العيوب والسمنة (36-42)
    { id: 36, text: "الكلمة التي نستطيع حذفها دون تغيير المعنى في 'من شغل نفسه بعيوب غيره كثرت عيوبه وهو لا يدري.'", options: ["شغل", "من", "نفسه", "هو"], answer: null, marked: false, correct: 3, explanation: "الضمير 'هو' يمكن حذفه.", description: "استيعاب المقروء - العيوب" },
    { id: 37, text: "من أسباب الإصابة بالسمنة:", options: ["قلة التوعية", "المشاكل صحية", "السمنة الوراثية", "قلة النشاط"], answer: null, marked: false, correct: 1, explanation: "السمنة حالة طبية.", description: "استيعاب المقروء - السمنة في الدول المتقدمة" },
    { id: 38, text: "نسبة غير المصابين بالسمنة في أمريكا هي:", options: ["33%", "66%", "77%", "50%"], answer: null, marked: false, correct: 1, explanation: "ثلث مصاب، فالثلثين (66%) غير مصابين." },
    { id: 39, text: "المقصود في النص بكلمة 'الطاقة'", options: ["السعرات الحرارية", "البروتينات", "الدهون", "الكربوهيدرات"], answer: null, marked: false, correct: 0, explanation: "الطاقة المأخوذة من الطعام تقاس بالسعرات." },
    { id: 40, text: "العلاقة بين (السمنة) و(زيادة الوزن):", options: ["ترادف", "تضاد", "تخصيص", "تسبب"], answer: null, marked: false, correct: 0, explanation: "ترادف (في سياق النص)." },
    { id: 41, text: "يمكن معالجة السمنة بـــــــ .....", options: ["زيادة الوعي الصحي", "الجلوس الطويل", "تناول السكريات", "قلة الحركة"], answer: null, marked: false, correct: 0, explanation: "زيادة الوعي الصحي تؤدي لتغيير السلوك." },
    { id: 42, text: "السمنة في الشباب.........", options: ["متناقصة", "متنامية", "مستقرة", "زائلة"], answer: null, marked: false, correct: 1, explanation: "كثرة الإصابات تعني أنها متنامية." },

    // استيعاب المقروء: الفلاح والشجاعة (43-50)
    { id: 43, text: "لما لم يزرع الفلاح؟", options: ["كان ينتظر الوقت المناسب", "لخوفه من العواقب", "لأنه ترك العمل", "لعدم توفر البذور"], answer: null, marked: false, correct: 1, explanation: "لخوفه من المطر والنمل.", description: "استيعاب المقروء - الفلاح" },
    { id: 44, text: "السبب الذي كان يمنع الفلاح من الزراعة هو......", options: ["الخوف", "التردد", "الكسل", "التشاؤم"], answer: null, marked: false, correct: 0, explanation: "الخوف من العواقب." },
    { id: 45, text: "العبرة من القصة هي....", options: ["أن لا تدع التشاؤم يحبط عملك", "عدم التراجع", "التوكل على الله", "التحلي بالصبر"], answer: null, marked: false, correct: 0, explanation: "التشاؤم يمنع العمل." },
    { id: 46, text: "الشجاع يَغلِب.... (كم من شجاع غلب...)", options: ["دائما", "كثيراً", "نادراً", "قليلاً"], answer: null, marked: false, correct: 1, explanation: "كلمة 'كم' في هذا السياق تفيد الكثرة.", description: "استيعاب المقروء - الشجاعة" },
    { id: 47, text: "ما الكلمة التي لا يمكن حذفها من النص السابق (الشجاعة)", options: ["بشجاعته", "الناس", "بإقدامه", "شجاع"], answer: null, marked: false, correct: 3, explanation: "شجاع هي الكلمة الأساسية." },
    { id: 48, text: "ما الكلمة التي يمكن حذفها من النص السابق ويستقيم المعنى (الشجاعة)", options: ["بشجاعته", "كم", "غلب", "هزمهم"], answer: null, marked: false, correct: 0, explanation: "بشجاعته يمكن استبدالها بإقدامه." },
    { id: 49, text: "ما علاقة 'وهزمهم بإقدامه' بما قبلها؟", options: ["سبب", "توضيح", "توكيد", "نتيجة"], answer: null, marked: false, correct: 2, explanation: "توكيد (الغلبة والهزيمة)." },
    { id: 50, text: "الضمير في 'هزمهم' يعود:", options: ["من", "شجاع", "الناس", "الأعداء"], answer: null, marked: false, correct: 2, explanation: "يعود على 'الناس'." },

    // استيعاب المقروء: الأحذية والنمو والزيت (51-62)
    { id: 51, text: "من سلبيات الأحذية الخشبية؟", options: ["عدم اتزانها", "الكعب العالي", "قصور تعميمها", "ثقل وزنها"], answer: null, marked: false, correct: 0, explanation: "تسبب التزحلق (عدم الاتزان).", description: "استيعاب المقروء - الأحذية" },
    { id: 52, text: "مشكلة الكعب في الأحذية الخشبية:", options: ["صناعته صعبة", "غير متوازن", "لا يصمد", "يتلف بسرعة"], answer: null, marked: false, correct: 1, explanation: "غير متوازن (يسبب التزحلق)." },
    { id: 53, text: "يترتب على صنع الأحذية القديمة بـ؟", options: ["عرضتها للتلف", "ثقل وزنها", "عدم تناسبها", "صعوبة صنعها"], answer: null, marked: false, correct: 0, explanation: "تتلف بسرعة وتتمزق." },
    { id: 54, text: "معنى يفضي:", options: ["يؤدي إلى", "يحكم", "يرفض", "يعين"], answer: null, marked: false, correct: 0, explanation: "يفضي تعني يؤدي أو ينتهي إلى.", description: "استيعاب المقروء - النمو والتنمية" },
    { id: 55, text: "معنى التغيير المصاحب للتنمية:", options: ["المؤثر فيها", "المداهن لها", "الموازي لها", "المعارض لها"], answer: null, marked: false, correct: 2, explanation: "المصاحب هو الموازي." },
    { id: 56, text: "علاقة النمو بالتنمية:", options: ["من الضروري أن تؤدي التنمية إلى النمو", "التنمية متعلقة بالنمو", "النمو والتنمية لا يؤدي أي منهما إلى الآخر", "النمو متعلق بالتنمية"], answer: null, marked: false, correct: 0, explanation: "التنمية تؤدي إلى التغير المادي (النمو)." },
    { id: 57, text: "الفقرة الأولى (النمو والتنمية) تتحدث عن:", options: ["التعريف", "الآثار", "التاريخ", "المقارنة"], answer: null, marked: false, correct: 0, explanation: "تبدأ بتعريف المصطلحين." },
    { id: 58, text: "أفضل عنوان لعموم النص (الزيت) هو:", options: ["أنواع الزيوت", "مشتقات الزيت", "اكتشاف الزيت وخواصه", "صناعة الزيت وآثارها"], answer: null, marked: false, correct: 2, explanation: "النص يتحدث عن التاريخ والاستخدام والخواص.", description: "استيعاب المقروء - الزيت" },
    { id: 59, text: "أقرب تاريخ لحفر أول بئر زيت (قبل نهاية النصف الأول من ق19):", options: ["1920", "1851", "1820", "1950"], answer: null, marked: false, correct: 2, explanation: "قبل 1850." },
    { id: 60, text: "تعتبر كلمة بترول في الفقرة (4):", options: ["ترادف كلمة (زيت)", "اسم لأحد مشتقات الزيت", "قريبة لكلمة (زيت)", "اسم لأحد مشتقات الزيت الثقيلة"], answer: null, marked: false, correct: 0, explanation: "ترادف لـ 'الزيت الخام'." },
    { id: 61, text: "معنى كلمة 'سمة' في الفقرة الثانية:", options: ["نظرة", "خاصية", "حاجة", "أساس"], answer: null, marked: false, correct: 3, explanation: "الزيت أصبح أساس هذا العصر." },
    { id: 62, text: "المقصود بـ (الأساليب الاقتصادية) في فقرة (1):", options: ["المتقدمة تقنياً", "الأسهل استعمالاً", "المتوفرة اقتصادياً", "المجدية مادياً"], answer: null, marked: false, correct: 0, explanation: "التي تمكن من الاستخراج على نطاق واسع (تقنياً)." },

    // الجبر والحساب والأسئلة المقالية (63-89)
    { id: 63, text: "أوجد قيمة المقدار: $\\frac{1}{3} + (\\frac{1}{2} \\times \\frac{1}{3}) – \\frac{1}{6} - \\frac{1}{3}$", options: ["1/6", "0", "2", "3"], answer: null, marked: false, correct: 1, explanation: "الجواب الرياضي الصحيح هو 0.", description: "الجبر والحساب" },
    { id: 64, text: "بطاقات مرقمة من 1 إلى 99، فما احتمال سحب بطاقة مجموع رقميها أكبر من 11؟", options: ["10/99", "11/99", "27/99", "28/99"], answer: null, marked: false, correct: 3, explanation: "عدد الأرقام هو 28." },
    { id: 65, text: "$10^6 – 1 = .....$", options: ["99800", "998000", "999999", "980000"], answer: null, marked: false, correct: 2, explanation: "$1,000,000 - 1 = 999,999$." },
    { id: 66, text: "كم مرة يتكرر الرقم ٩ من ١ الى ١٠٠؟", options: ["19", "20", "21", "22"], answer: null, marked: false, correct: 1, explanation: "20 مرة (في الآحاد 10 و في العشرات 10)." },
    { id: 67, text: "ما قيمة المقدار تقريباً: $\\frac{10}{\\sqrt{30} \\times \\sqrt{10}}$", options: ["1/\\sqrt{3}", "1/3", "1/10", "1/30"], answer: null, marked: false, correct: 0, explanation: " $\\frac{10}{\\sqrt{300}} = \\frac{1}{\\sqrt{3}}$." },
    { id: 68, text: "ما نصف العدد $2^{50}$", options: ["$2^{62}$", "$2^{52}$", "$2^{49}$", "$2^{51}$"], answer: null, marked: false, correct: 2, explanation: "$2^{50} / 2 = 2^{49}$." },
    { id: 69, text: "إذا كان $2^n + 2^n + 2^n +2^n = 8^2$ فما قيمة $n$؟", options: ["2", "8", "4", "6"], answer: null, marked: false, correct: 2, explanation: "$4 \\times 2^n = 64 \\Rightarrow n=4$." },
    { id: 70, text: "أوجد قيمة المقدار: $\\frac{18 \\times 32}{16 \\times 9}$", options: ["1", "2", "4", "6"], answer: null, marked: false, correct: 2, explanation: "$ (18/9) \\times (32/16) = 4$." },
    { id: 71, text: "شخص عمره 4.15 سنة، فعمره تقريبًا 4 سنوات و .....", options: ["شهر و28 يوم", "ثلاثة أشهر", "15 يوم", "شهر و 24 يوم"], answer: null, marked: false, correct: 3, explanation: "$0.15 \\times 12 = 1.8$ شهر = 1 شهر و 24 يوم." },
    { id: 72, text: "أوجد قيمة: 4% من 100", options: ["4", "3.96", "3.92", "3.84"], answer: null, marked: false, correct: 0, explanation: "$4\\% \\times 100 = 4$." },
    { id: 73, text: "أوجد قيمة: $\\frac{4}{10} / \\frac{9}{10}$", options: ["4/10", "5/10", "4/9", "5/9"], answer: null, marked: false, correct: 2, explanation: " $\\frac{4}{10} \\times \\frac{10}{9} = \\frac{4}{9}$." },
    { id: 74, text: "ما قيمة $(51)^2 – (49)^2$", options: ["200", "400", "600", "49"], answer: null, marked: false, correct: 0, explanation: " $(51-49)(51+49) = 200$." },
    { id: 75, text: "إذا كان $أ – ب = ٥$، $ب – ج = ٣$، $ج + د = ١$، أوجد $أ + د$", options: ["1", "8", "9", "4"], answer: null, marked: false, correct: 2, explanation: " $أ+د = 9$." },
    { id: 76, text: "أوجد قيمة المقدار: $\\frac{2^7 + 2^7}{2^7 + 2^7 + 2^7 + 2^7}$", options: ["1/4", "1/2", "1/8", "1/16"], answer: null, marked: false, correct: 1, explanation: " $\\frac{2 \\times 2^7}{4 \\times 2^7} = \\frac{1}{2}$." },
    { id: 77, text: "أوجد الحد التالي: 3، 7، 9، 15، .........", options: ["19", "21", "23", "25"], answer: null, marked: false, correct: 2, explanation: "متتابعتان متداخلتان." },
    { id: 78, text: "نريد توزيع 64 حاسب و 48 طابعة على عدد من الغرف. فما أكبر عدد من هذه الغرف؟", options: ["8 غرف", "12 غرفة", "16 غرفة", "24 غرفة"], answer: null, marked: false, correct: 2, explanation: "القاسم المشترك الأكبر لـ 64 و 48 هو 16.", description: "الأسئلة المقالية" },
    { id: 79, text: "زادت أرباح شركة بقدار 10% كل سنة خلال 3 سنوات. فما إجمالي الأرباح بعد السنة الثالثة؟", options: ["25%", "33.1%", "35%", "30%"], answer: null, marked: false, correct: 1, explanation: "$ (1.1)^3 - 1 = 33.1\\% $." },
    { id: 80, text: "أب عمره 71، وابن عمره 35، فبعد كم سنة يصبح عمر الأب مثلي عمر الابن؟", options: ["سنة", "سنتين", "8 سنين", "4 سنين"], answer: null, marked: false, correct: 0, explanation: " $س = 1$." },
    { id: 81, text: "سفينة تحمل 20 صندوق كبير أو 24 صندوق صغير. إذا حملت 15 كبير، كم صغير يمكن أن تحمل؟", options: ["4 صناديق", "6 صناديق", "8 صناديق", "10 صناديق"], answer: null, marked: false, correct: 1, explanation: "الجزء المتبقي $\\frac{5}{20} \\times 24 = 6$." },
    { id: 82, text: "مستطيل 300 × 100 سم، الورقة 30 × 20 سم. كم عدد الأوراق؟", options: ["50 ورقة", "75 ورقة", "100 ورقة", "150 ورقة"], answer: null, marked: false, correct: 0, explanation: " $\\frac{300 \\times 100}{30 \\times 20} = 50$." },
    { id: 83, text: "دفع أحمد 45% وفهد 25%، وتبقى 360000 ريال. فما تكلفة بناء المسجد كاملة؟", options: ["1200000 ريال", "1400000 ريال", "2400000 ريال", "1000000 ريال"], answer: null, marked: false, correct: 0, explanation: " $30\\% = 360000 \\Rightarrow 100\\% = 1200000$." },
    { id: 84, text: "اشترى تاجر سلعة بـ 90، يبيع بربح 50%، خصم نقدي 30%. فما نسبة ربح التاجر إذا باع نقداً؟", options: ["5%", "10%", "20%", "30%"], answer: null, marked: false, correct: 0, explanation: "الربح: 5\\%." },
    { id: 85, text: "مضمار دائري، المسافة بين الرياضي ومركزه 100 متر. ما طول المضمار؟", options: ["100 متر", "200 متر", "314 متر", "628 متر"], answer: null, marked: false, correct: 3, explanation: "المحيط $= 628$." },
    { id: 86, text: "باع تاجر بربح نصف المبلغ. ما النسبة التي يجب أن لا يتجاوزها تخفيضه ليضمن هامش الربح؟", options: ["50%", "67%", "33%", "77%"], answer: null, marked: false, correct: 2, explanation: "أقصى تخفيض $\\approx 33\\%$. " },
    { id: 87, text: "عند إلقاء حجر نرد وقطعة نقدية، ما احتمال ظهور عدد فردي أو شعار؟", options: ["1/3", "1/4", "2/3", "3/4"], answer: null, marked: false, correct: 3, explanation: " $P(\\text{فردي أو شعار}) = 3/4$." },
    { id: 88, text: "عجلة نصف قطرها = 50سم وتدور 6 دورات. فكم المسافة التي تقطعها بالمتر؟", options: ["1884", "188.4", "18.84", "1.884"], answer: null, marked: false, correct: 2, explanation: " $18.84$ متر." },
    { id: 89, text: "وزعت 32 قطعة كعك بالتساوي على 12 طفل، فكم عدد القطع المتبقية؟", options: ["8 قطع", "9 قطع", "10 قطع", "11 قطعة"], answer: null, marked: false, correct: 0, explanation: " $32 \\div 12$ الباقي 8." },
    
    // الهندسة (90-101)
    { id: 90, text: "في شكل شبه منحرف، أوجد س + ص (زاويتان خارجيتان).", options: ["$230^{\\circ}$", "$130^{\\circ}$", "$270^{\\circ}$", "$115^{\\circ}$"], answer: null, marked: false, correct: 0, explanation: " $230^{\\circ}$.", description: "الهندسة" },
    { id: 91, text: "في الشكل المجاور أوجد طول أ ج: (أ ب = 7، ب د = 4، د ج = 4).", options: ["7", "8", "9", "10"], answer: null, marked: false, correct: 2, explanation: "$ 9$." },
    { id: 92, text: "في شكل رباعي دائري، أوجد قيمة س (الزاوية المقابلة $80^{\\circ}$).", options: ["$80^{\\circ}$", "$100^{\\circ}$", "$110^{\\circ}$", "$120^{\\circ}$"], answer: null, marked: false, correct: 1, explanation: " $100^{\\circ}$." },
    { id: 93, text: "أحسب محيط الشكل التالي (مكون من مربعين أضلاعهما 3 و 4).", options: ["18", "20", "22", "24"], answer: null, marked: false, correct: 2, explanation: "المحيط $= 22$." },
    { id: 94, text: "إذا كان طول ضلع المربع = 20 سم ورؤوسه مركز لأربع دوائر، أوجد مساحة المظلل (4 أرباع دائرة).", options: ["$25\\pi$", "$50\\pi$", "$100\\pi$", "$125\\pi$"], answer: null, marked: false, correct: 2, explanation: "المساحة $= 100\\pi$." },
    { id: 95, text: "كم عدد المثلثات في الشكل (مستطيل داخله مربع مقسوم بقطرين).", options: ["8", "10", "12", "16"], answer: null, marked: false, correct: 3, explanation: "العدد الكلي 16." },
    { id: 96, text: "أوجد نسبة الزيادة بين عامي 1433هـ (150) إلى عام 1430هـ (125).", options: ["10%", "15%", "20%", "25%"], answer: null, marked: false, correct: 2, explanation: " $20\\%$. " },
    { id: 97, text: "أوجد مثلي س + ص (زاويتان حادتان في مثلث قائم).", options: ["60", "90", "120", "180"], answer: null, marked: false, correct: 3, explanation: " $180^{\\circ}$." },
    { id: 98, text: "ما قياس الزاوية س؟", options: ["$60^{\\circ}$", "$120^{\\circ}$", "$140^{\\circ}$", "$100^{\\circ}$"], answer: null, marked: false, correct: 1, explanation: " $120^{\\circ}$." },
    { id: 99, text: "ما نوع المثلث؟ (أضلاعه 4س، 3س، 2س).", options: ["مثلث قائم", "مثلث حاد", "مثلث متطابق الأضلاع", "مثلث منفرج"], answer: null, marked: false, correct: 3, explanation: "مثلث منفرج." },
    { id: 100, text: "ما متوسط الإيرادات للأعوام الأربعة؟ ($8+12+10+16$).", options: ["11.5", "12.5", "40", "46"], answer: null, marked: false, correct: 0, explanation: " $11.5$." },
    { id: 101, text: "كم عدد المستطيلات في الشكل (مستطيل مقسم إلى 5 أقسام طولية).", options: ["6", "15", "18", "24"], answer: null, marked: false, correct: 1, explanation: " 15." },

    // أسئلة المقارنة (102-120)
    { id: 102, text: "قارن بين: القيمة الأولى: $9 – 0.0044$، القيمة الثانية: $9 – 0.00044$", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 1, explanation: "طرح عدد أصغر يعطي نتيجة أكبر.", description: "أسئلة المقارنة" },
    { id: 103, text: "قارن بين: القيمة الأولى: كمية العصير التي تملأ الإسطوانة، القيمة الثانية: 750 ملليلتر", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 0, explanation: "تم افتراض أن السعة أكبر من 750 مل." },
    { id: 104, text: "قارن بين: القيمة الأولى: 40% من 60، القيمة الثانية: 60 من 40%", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 2, explanation: "متساويتان." },
    { id: 105, text: "قارن بين: مساحة المستطيل، مساحة المربع (في شكل تقريبي).", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 1, explanation: "المربع هو الشكل الذي يعطي أكبر مساحة لنفس المحيط." },
    { id: 106, text: "قارن بين: $\\sqrt{750}$ و 28", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 1, explanation: "الثانية أكبر." },
    { id: 107, text: "قارن بين: مساحة المربع (ضلعه 5)، مساحة المثلث (قاعدة وارتفاع 10).", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 1, explanation: "الثانية أكبر." },
    { id: 108, text: "إذا كان $س^3 = 48$ قارن بين: $س^2$ و 15", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 1, explanation: "15 أكبر." },
    { id: 109, text: "إذا كانت $0 < ص < س$ قارن بين: $س^{1436}$ و $ص^{2015}$", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 0, explanation: "الأولى أكبر." },
    { id: 110, text: "قارن بين: مساحة الجزء (س)، مساحة الجزء (ص) (في مستطيل مقسوم بمثلث).", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 2, explanation: "متساويتان." },
    { id: 111, text: "في مستطيل أ ب ج د، قارن بين: عدد مستقيمات أ ب ج د (4 أضلاع و 2 قطر) و 6", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 2, explanation: "متساويتان." },
    { id: 112, text: "المسافة من س إلى ص = 12، والمسافات بينهم متساوية. قارن بين: 3 و ع ل.", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 1, explanation: "الثانية أكبر." },
    { id: 113, text: "قارن بين: محيط سداسي منتظم قطره = 8، محيط دائرة قطرها = 8", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 1, explanation: "الثانية أكبر." },
    { id: 114, text: "إذا كان $3 < س < 5$، $ص < س$. قارن بين: 0.75 و $س/ص$", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 1, explanation: "الثانية أكبر." },
    { id: 115, text: "قارن بين: عمر أحمد بالهجري، عمر أحمد بالميلادي", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 3, explanation: "المعطيات غير كافية." },
    { id: 116, text: "قارن بين: نسبة المظلل إلى الشكل، و $3:1$", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 2, explanation: "متساويتان." },
    { id: 117, text: "قارن بين: $(7 + 6) \\div (6 + 7)$ و $(7 + 7) \\div (7 + 8)$", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 0, explanation: "الأولى أكبر." },
    { id: 118, text: "قارن بين: 100 و $\\sqrt{100 \\times 100}$", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 2, explanation: "متساويتان." },
    { id: 119, text: "إذا كان $0 < ص < س$ قارن بين: $(س)^{2016}$ و $(ص)^{2015}$", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 0, explanation: "الأولى أكبر." },
    { id: 120, text: "قارن بين: $\\frac{10}{3}$ و $\\frac{13}{4}$", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 0, explanation: "الأولى أكبر." }
  ];
}

function updateQuestion() {
  const q = questions[currentIndex];
  const qBox = document.getElementById("question-box");
  const sectionTitle = document.getElementById("section-title");

  // 1. عرض عنوان الفقرة إذا وجد
  let currentDescription = q.description || "";
  if (currentDescription) {
      // نتحقق مما إذا كان العنوان يتطابق مع العنوان السابق
      if (currentIndex === 0 || questions[currentIndex - 1].description !== currentDescription) {
          sectionTitle.innerHTML = `<h2>${currentDescription}</h2>`;
      }
  }

  // 2. تحديث رأس السؤال ورقم السؤال
  let totalQuestionNumber = (currentIndex + 1);
  let totalQuestionsCount = questions.length;
  sectionTitle.innerHTML += `<h3>السؤال ${totalQuestionNumber} من ${totalQuestionsCount}</h3>`;

  // 3. عرض نص السؤال
  // استخدام دالة لتحويل رموز الكسور إلى HTML/LaTeX
  function formatText(text) {
    // تبديل الكسور الشائعة إلى رموز يونيكود أو LaTeX بسيط للعرض
    return text.replace(/(\\frac{([^{}]+)}{([^{}]+)})/g, (match, p1, numerator, denominator) => {
        return `<span style="font-size: 1.2em; vertical-align: middle;">${numerator}&frasl;${denominator}</span>`;
    })
    .replace(/\b1\/2\b/g, '½')
    .replace(/\b1\/3\b/g, '⅓')
    .replace(/\b1\/4\b/g, '¼')
    .replace(/\b3\/4\b/g, '¾')
    .replace(/\\sqrt{([^{}]+)}/g, (match, p1) => `&radic;${p1}`);
  }

  document.getElementById("question-text").innerHTML = formatText(q.text);

  let answersHTML = "";
  q.options.forEach((opt, i) => {
    if (opt) {
        answersHTML += `<label><input type="radio" name="answer" value="${i}" ${q.answer === i ? "checked" : ""}> ${formatText(opt)}</label>`;
    }
  });
  document.getElementById("answers").innerHTML = answersHTML;

  // زر إنهاء الامتحان في آخر سؤال فقط
  const endExamBtn = document.getElementById("end-exam");
  if (currentIndex === questions.length - 1) {
    endExamBtn.style.display = "block";
  } else {
    endExamBtn.style.display = "none";
  }
}

function saveAnswer() {
  const selected = document.querySelector("input[name='answer']:checked");
  questions[currentIndex].answer = selected ? parseInt(selected.value) : null;
}

function nextQuestion() {
  saveAnswer();
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    updateQuestion();
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentIndex > 0) {
    currentIndex--;
    updateQuestion();
  }
}

function markQuestion() {
  questions[currentIndex].marked = !questions[currentIndex].marked; 
  alert(questions[currentIndex].marked ? "⭐ تم وضع علامة مرجعية" : "❌ تم إزالة العلامة المرجعية");
}

function reviewSection() {
  saveAnswer();
  let html = `<h2>مراجعة القسم ${section}</h2><ul>`;
  questions.forEach((q, i) => {
    let status = q.answer !== null ? "✅ مجاب" : "❌ غير مجاب";
    if (q.marked) status += " ⭐ مرجعي";
    html += `<li>سؤال ${i + 1}: ${status} <button onclick="goTo(${i})">🔁</button></li>`;
  });
  html += `</ul>
    <button onclick="goTo(0)">🔙 العودة لأول سؤال</button>
    <button onclick="chooseQuestion()">🔍 العودة لسؤال محدد</button>
    <button onclick="endSection()">✅ إنهاء القسم</button>`;
  document.body.innerHTML = html;
}

function goTo(index) {
  saveAnswer();
  localStorage.setItem("returnTo", index);
  localStorage.setItem("questions", JSON.stringify(questions));
  location.reload();
}

function chooseQuestion() {
  let num = prompt("أدخل رقم السؤال:");
  if (num && !isNaN(num) && num >= 1 && num <= questions.length) {
    goTo(parseInt(num) - 1);
  }
}

function endSection() {
  saveAnswer();
  if (mode === "real" && section < totalSections) {
    localStorage.setItem("section", section + 1);
    location.reload();
  } else {
    finishExam();
  }
}

function finishExam() {
  saveAnswer();
  let correctAnswers = 0;
  let totalScorePerSection = {}; // لحساب الدرجات لكل قسم

  questions.forEach(q => {
    const sectionName = q.description || "عام";
    
    if (!totalScorePerSection[sectionName]) {
        totalScorePerSection[sectionName] = { correct: 0, total: 0, score: 0 };
    }
    totalScorePerSection[sectionName].total++;

    if (q.answer !== null && q.answer === q.correct) {
      correctAnswers++;
      totalScorePerSection[sectionName].correct++;
      totalScorePerSection[sectionName].score += 0.83;
    }
  });

  const totalScore = (correctAnswers * 0.83).toFixed(2);
  const totalQuestions = questions.length;
  
  localStorage.setItem("quizResults", JSON.stringify({
    score: totalScore,
    correct: correctAnswers,
    total: totalQuestions,
    sectionScores: totalScorePerSection
  }));

  window.location.href = "thankyou.html";
}

// عداد الوقت
setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    document.getElementById("timer").textContent = `الوقت المتبقي: ${min}:${sec < 10 ? "0" + sec : sec}`;
  } else {
    reviewSection();
  }
}, 1000);

// تحميل أول سؤال أو العودة لسؤال محدد
const returnTo = localStorage.getItem("returnTo");
if (returnTo !== null) {
  currentIndex = parseInt(returnTo);
  localStorage.removeItem("returnTo");
}
updateQuestion();
