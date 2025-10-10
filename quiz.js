let mode = localStorage.getItem("mode");
let currentSection = parseInt(localStorage.getItem("section") || "1");
let totalSections = parseInt(localStorage.getItem("totalSections") || "1");
let currentIndex = 0;
let timeLeft = 25 * 60; // 25 دقيقة لكل قسم

// كل قسم يبدأ بعد 25 سؤال (0, 25, 50, 75, 100)
const QUESTIONS_PER_SECTION = 25;
const sectionStarts = [0, 25, 50, 75, 100];

// مصفوفة الأسئلة (125 سؤال لتغطية 5 أقسام)
let allQuestions = [
    // القسم 1 (0-24)
    { id: 1, text: "أوجد المفردة الشاذة:", options: ["ثمار", "حبوب", "حصاد", "فواكه"], answer: null, marked: false, correct: 2, header: "المفردة الشاذة" },
    { id: 2, text: "أوجد المفردة الشاذة:", options: ["شمس", "قمر", "نور", "الإضاءة"], answer: null, marked: false, correct: 3 },
    { id: 3, text: "أوجد المفردة الشاذة:", options: ["مسك", "نعناع", "فل", "ياسمين"], answer: null, marked: false, correct: 0 },
    { id: 4, text: "أوجد المفردة الشاذة:", options: ["سعي", "طواف", "حج", "رمي"], answer: null, marked: false, correct: 2 },
    { id: 5, text: "أوجد المفردة الشاذة:", options: ["رغبة", "رهبة", "خشية", "فزع"], answer: null, marked: false, correct: 0 },
    { id: 6, text: "أوجد المفردة الشاذة:", options: ["كسور", "كدمات", "جروح", "كمادات"], answer: null, marked: false, correct: 3 },
    { id: 7, text: "أوجد المفردة الشاذة:", options: ["أفقي", "عمودي", "رأسي", "مائل"], answer: null, marked: false, correct: 3 },
    { id: 8, text: "سوريا : دمشق (دولة : عاصمة)", options: ["فلسطين : غزة", "مصر : الإسكندرية", "المغرب : الرباط", "لبنان : طرابلس"], answer: null, marked: false, correct: 2, header: "التناظر اللفظي" },
    { id: 9, text: "مغزل : مقص (أدوات عمل)", options: ["جزار : منجرة", "معلم : مسطرة", "دراجة : عجلة", "منشار : مسمار"], answer: null, marked: false, correct: 3 },
    { id: 10, text: "ورد : عطر (مصدر : ناتج)", options: ["زهرة : لون", "إنفاق : إسراف", "رمل : زجاج", "خزان : ماء"], answer: null, marked: false, correct: 2 },
    { id: 11, text: "وعاء : قدر (مرادفات)", options: ["أواني : نحاس", "شاحنة : سيارة", "صحن : دلو", "زنجبيل : بهار"], answer: null, marked: false, correct: 2 },
    { id: 12, text: "ريح : إعصار (درجة قصوى)", options: ["فل : ياسمين", "ليل : نهار", "نجاح : عمل", "حرب : ضروس"], answer: null, marked: false, correct: 3 },
    { id: 13, text: "حذاء : إنسان (حماية)", options: ["ظلف : خروف", "حذوة : حصان", "خاتم : ذهب", "قدم : خلخال"], answer: null, marked: false, correct: 1 },
    { id: 14, text: "احذر من ......... إذا مازحته ومن ......... إذا عاشرته.", options: ["الأرعن - السافل", "الكريم - اللئيم", "الحاقد - الحسود", "الذكي - الغبي"], answer: null, marked: false, correct: 0, header: "إكمال الجمل" },
    { id: 15, text: "الموت جوعاً أشرف من أن تكون عبداً.....", options: ["قوياً", "مطيعاً", "متخماً", "سيئاً"], answer: null, marked: false, correct: 2 },
    { id: 16, text: "من اتكل في ...... على زاد غيره طال .....", options: ["علمه – تعبه", "سفره – جوعه", "حزنه – شبعه", "حضره – خطره"], answer: null, marked: false, correct: 1 },
    { id: 17, text: "سارع إلى الناس بما ..... حتى لا يقولون عنك مالا ......... ", options: ["يحبون – يجهلون", "يحبون – يفعلون", "يكرهون – يعملون", "تريد – تعلم"], answer: null, marked: false, correct: 0 },
    { id: 18, text: "إن ...... لب الجسد إذا صلح ....... الجسد", options: ["القلب - ربع", "القلب - سائر", "الرئتين - باقي", "الدماغ - كل"], answer: null, marked: false, correct: 1 },
    { id: 19, text: "السبب في ......... إما أن تكون غبياً وإما أن تكون .........", options: ["النجاح - ذكياً", "الفشل - متكاسلاً", "السعادة - متفائلاً", "التعاسة - حزيناً"], answer: null, marked: false, correct: 1 },
    { id: 20, text: "لكي تكون رؤيتك ...... للأمور عليك تغيير ..... ", options: ["ثاقبة - حكمك", "حصيفة - نظرتك", "مهمة - أفكارك", "جيدة - نفسك"], answer: null, marked: false, correct: 1 },
    { id: 21, text: "الحب قادر على بعث اسوأ المشاعر وأكثرها ألما", options: ["بعث", "اسوأ", "المشاعر", "ألما"], answer: null, marked: false, correct: 0, header: "الخطأ السياقي" },
    { id: 22, text: "رأس العقل التدبير في الإنفاق دون بذل", options: ["رأس", "العقل", "الإنفاق", "بذل"], answer: null, marked: false, correct: 3 },
    { id: 23, text: "سأل الممكن الأمل أين تقيم، فأجاب في أحلام العاجز", options: ["الأمل", "يقيم", "أحلام", "العاجز"], answer: null, marked: false, correct: 0 },
    { id: 24, text: "كل شيء إذا قل رخص إلا العلم إذا كثر غلا", options: ["قل", "رخص", "العلم", "غلا"], answer: null, marked: false, correct: 0 },
    { id: 25, text: "أوجد المفردة الشاذة:", options: ["قارب", "سفينة", "مرفأ", "باخرة"], answer: null, marked: false, correct: 2 },

    // القسم 2 (25-49)
    { id: 26, text: "يتعدل مجموع معدلي الحضانة الجدري والجديري من:", options: ["7 إلى 14 يوم", "14 إلى 21 يوم", "26 إلى 33 يوم", "من 1 إلى 7 أيام"], answer: null, marked: false, correct: 2, header: "استيعاب المقروء - الجدري والجديري", 
      paragraph: "الجديري مرض ينشأ عن فيروس يختلف عن فيروس الجدري، ولذلك يسمى بالجدري الكاذب، ويكثر بين الأطفال، ونسبة وفياته قليلة بالنسبة إلى وفيات الجدري، ومدة حضانته أطول، فهي اسبوعان أو ثلاثة، بينما في الجدري هي اثنا عشر يومًا، ويبدأ المرض بتوعك بسيط مع ارتفاع قليل في درجة الحرارة، وبعد أربع وعشرين ساعة يظهر الطفح الخاص بالمرض على شكل حليمات تتحول في مدة ساعة أو اثنتين إلى حويصلات، ويمكن التفريق بين طفح الجديري وطفح الجدري بتأخر ظهور الأول حتى اليوم الثالث أو الرابع، وظهور الثاني في اليوم الاول، ويظهر طفح الجدري أولاً على الوجه، أما طفح الجديري فيظهر على الجذع، وتنتقل عدوى الجديري بواسطة الرذاذ الخارج من المسالك التنفسية العليا للمرضى." },
    { id: 27, text: "مرض الجديري يعد:", options: ["مرض جلدي", "مرض تناسلي", "مرض جذعي", "مرض باطني"], answer: null, marked: false, correct: 0 },
    { id: 28, text: "يمكن أن يصاب الشخص في عمر:", options: ["13 سنة", "15 سنة", "18 سنة", "19 سنة"], answer: null, marked: false, correct: 0 },
    { id: 29, text: "في أي مكان يظهر طفح الجدري الصادق؟", options: ["الوجه", "اليدين", "البطن", "الجذع"], answer: null, marked: false, correct: 0 },
    { id: 30, text: "عند الإصابة بالجديري تظهر الأعراض في خلال:", options: ["يومان", "3 ايام", "يوم", "4 ساعات"], answer: null, marked: false, correct: 1 },
    { id: 31, text: "في أي يوم يظهر الجدري؟", options: ["اليوم الأول", "اليوم الثاني", "اليوم الثالث", "اليوم الرابع"], answer: null, marked: false, correct: 0 },
    { id: 32, text: "ما هي الأماكن التي تكثر فيها حشرة السمك؟", options: ["الشقوق", "الأماكن الندية", "الأماكن الضيقة", "الأماكن المظلمة"], answer: null, marked: false, correct: 1, header: "استيعاب المقروء - حشرة السمك",
      paragraph: "حشرة السمك هي عبارة عن حشرة صغير، طولها يبلغ 1سم، لونها فضي، تضع بيوضها في الشقوق، وعندما تفقس تتحول صغارها إلى حورية فتكبر بسرعة وتتغذى على اللوحات والأقمشة وأغلفة الكتب والستائر والسجاد لأنها تكون متسخة. تكثر حشرة السمك في الأماكن الرطبة (المبللة) وقليلة الحركة (يقل فيها الناس) وحشرة السمك تمشي بسرعة. ولمكافحة تلك الحشرة يوجد العديد من الطرق فلابد النظافة والعناية المنزلية المستمرة أو استخدام مواد طاردة ويمكن وضع مادة قابلة للبلل." },
    { id: 33, text: "أين تضع حشرة السمك بيضها؟", options: ["الأماكن التي يكثر فيها العفن", "في المحيطات", "الشقوق (الأماكن الضيقة)", "في البحيرات"], answer: null, marked: false, correct: 2 },
    { id: 34, text: "ما أسلم طريقة للتخلص من حشرة السمك والأكثر أماننًا؟", options: ["المبيدات الحشرية", "العناية بالنظافة بشكل مستمر", "بودرة سامة", "المواد المبللة"], answer: null, marked: false, correct: 1 },
    { id: 35, text: "لماذا تأكل حشرة السمك السجاجيد؟", options: ["لأنها تكون مبللة", "لجوعها", "لعدم نظافتها (لأنها تكون متسخة)", "لأنها تكون عفنة"], answer: null, marked: false, correct: 2 },
    { id: 36, text: "أي مما يلي لا يتوافق مع النص؟", options: ["حشرة السمك تمشي بسرعة وأكلها بطيء", "تكثر حشرة السمك في الأماكن المبللة", "تكثر في الأماكن قليلة الحركة", "تأكل حشرة السمك الستائر غير النظيفة"], answer: null, marked: false, correct: 0 },
    { id: 37, text: "الكلمة التي نستطيع حذفها دون تغيير المعنى في 'من شغل نفسه بعيوب غيره كثرت عيوبه وهو لا يدري.'", options: ["شغل", "من", "نفسه", "هو"], answer: null, marked: false, correct: 3, header: "استيعاب المقروء - العيوب",
      paragraph: "من شغل نفسه بعيوب غيره كثرت عيوبه وهو لا يدري." },
    { id: 38, text: "من أسباب الإصابة بالسمنة:", options: ["قلة التوعية", "المشاكل صحية", "السمنة الوراثية", "قلة النشاط"], answer: null, marked: false, correct: 1, header: "استيعاب المقروء - السمنة في الدول المتقدمة",
      paragraph: "تعرف السمنة بأنها حالة طبية تتراكم فيها دهون الجسم الزائدة لدرجة أنها تؤثر على الجسم بشكل سلبي، وتؤدي لانخفاض متوسط عمر الفرد، وسببت هذه المشكلة آثاراً سيئة في عدد من الدول، ومنها الولايات المتحدة الامريكية حيث أن أكثر من ثلث سكانها مصابون بالسمنة، و25% من سكان كندا مصابون بالسمنة أيضاً، وعدد كبير من الشباب يصاب بها، ومن أبرز أسباب الإصابة بها الجلوس الطويل أمام التلفاز والكومبيوتر، ويصاب الفرد بالسمنة بسبب أن الطاقة التي يأخذها من الطعام أكبر من قدر الطاقة التي يستهلكها، وأغلب من أصيب بالسمنة من الشباب سيظل مصاباً بها حتى في سن متقدم." },
    { id: 39, text: "نسبة غير المصابين بالسمنة في أمريكا هي:", options: ["33%", "66%", "77%", "50%"], answer: null, marked: false, correct: 1 },
    { id: 40, text: "المقصود في النص بكلمة 'الطاقة'", options: ["السعرات الحرارية", "البروتينات", "الدهون", "الكربوهيدرات"], answer: null, marked: false, correct: 0 },
    { id: 41, text: "العلاقة بين (السمنة) و(زيادة الوزن):", options: ["ترادف", "تضاد", "تخصيص", "تسبب"], answer: null, marked: false, correct: 0 },
    { id: 42, text: "يمكن معالجة السمنة بـــــــ .....", options: ["زيادة الوعي الصحي", "الجلوس الطويل", "تناول السكريات", "قلة الحركة"], answer: null, marked: false, correct: 0 },
    { id: 43, text: "السمنة في الشباب.........", options: ["متناقصة", "متنامية", "مستقرة", "زائلة"], answer: null, marked: false, correct: 1 },
    { id: 44, text: "أي جملة تلخص الفقرة:", options: ["السمنة حالة طبية تؤدي لانخفاض متوسط العمر", "السمنة تنتشر في الدول المتقدمة", "زيادة الطاقة المأخوذة من الطعام تسبب السمنة", "أغلب الشباب المصاب بالسمنة يستمر عليها"], answer: null, marked: false, correct: 0 },
    { id: 45, text: "لما لم يزرع الفلاح؟", options: ["كان ينتظر الوقت المناسب", "لخوفه من العواقب", "لأنه ترك العمل", "لعدم توفر البذور"], answer: null, marked: false, correct: 1, header: "استيعاب المقروء - الفلاح",
      paragraph: "سأل أحدهم فلاحاً فقال له : أزرعت قمحاً هذه السنة؟ قال الفلاح : لا، فقد خفت أن يأتي المطر ويفسده. فسأله الرجل : إذا زرعت ذرة؟ قال الفلاح : لا فقد خفت أن يأكلها النمل قال الرجل : ما الذي زرعته إذا؟ قال الفلاح : لم أزرع شيئا، وهكذا أنا في الجانب الآمن" },
    { id: 46, text: "السبب الذي كان يمنع الفلاح من الزراعة هو......", options: ["الخوف", "التردد", "الكسل", "التشاؤم"], answer: null, marked: false, correct: 0 },
    { id: 47, text: "العبرة من القصة هي....", options: ["أن لا تدع التشاؤم يحبط عملك", "عدم التراجع", "التوكل على الله", "التحلي بالصبر"], answer: null, marked: false, correct: 0 },
    { id: 48, text: "الشجاع يَغلِب.... (كم من شجاع غلب...)", options: ["دائما", "كثيراً", "نادراً", "قليلاً"], answer: null, marked: false, correct: 1, header: "استيعاب المقروء - الشجاعة",
      paragraph: "كم من شجاع غلب الناس بشجاعته وهزمهم بإقدامه!" },
    { id: 49, text: "ما الكلمة التي لا يمكن حذفها من النص السابق (الشجاعة)", options: ["بشجاعته", "الناس", "بإقدامه", "شجاع"], answer: null, marked: false, correct: 3 },

    // القسم 3 (50-74)
    { id: 50, text: "ما الكلمة التي يمكن حذفها من النص السابق ويستقيم المعنى (الشجاعة)", options: ["بشجاعته", "كم", "غلب", "هزمهم"], answer: null, marked: false, correct: 0 },
    { id: 51, text: "ما علاقة 'وهزمهم بإقدامه' بما قبلها؟", options: ["سبب", "توضيح", "توكيد", "نتيجة"], answer: null, marked: false, correct: 2, header: "مرادف إقدامه" },
    { id: 52, text: "الضمير في 'هزمهم' يعود:", options: ["من", "شجاع", "الناس", "الأعداء"], answer: null, marked: false, correct: 2 },
    { id: 53, text: "مرادف 'إقدامه':", options: ["جبنه", "شجاعته", "قوته", "تراجعه"], answer: null, marked: false, correct: 1 },
    { id: 54, text: "من سلبيات الأحذية الخشبية؟", options: ["عدم اتزانها", "الكعب العالي", "قصور تعميمها", "ثقل وزنها"], answer: null, marked: false, correct: 0, header: "استيعاب المقروء - الأحذية", paragraph: "كان المصريون أول شعب متحضر يصنع الأحذية، وقد استخدموا لبادات من الجلود أو ورق البردى و كانوا يشدونها إلى القدم بواسطة رباطين، ولحماية إبهام القدمين كانوا يرفعون مقدمة الصندل إلى الأعلى، لكنه كان يتلف بسرعة ويتمزق، وتقدم الرومان خطوة أخرى وصنعوا نوعًا من الأحذية أسموه 'كالسيوس'، كانت له 8 شقوق على الجانبين ورباط يعقد في المقدمة، وقد صنعوا هذا النوع من الأحذية بأشكال مختلفة كانت تنتعلها الطبقات المختلفة في المجتمع الروماني وصنعت الأحذية الخشبية وكان عيبها أنها ثقيلة الوزن وتسبب التزحلق ما  بسبب الكعب الذي كان فيها، بعدها تطوروا وصنع البريطانيون أحذية من المطاط وجعلوها فردة يمين وأخرى يسار." },
    { id: 55, text: "مشكلة الكعب في الأحذية الخشبية:", options: ["صناعته صعبة", "غير متوازن", "لا يصمد", "يتلف بسرعة"], answer: null, marked: false, correct: 1 },
    { id: 56, text: "يترتب على صنع الأحذية القديمة بـ؟", options: ["عرضتها للتلف", "ثقل وزنها", "عدم تناسبها", "صعوبة صنعها"], answer: null, marked: false, correct: 0 },
    { id: 57, text: "معنى يفضي:", options: ["يؤدي إلى", "يحكم", "يرفض", "يعين"], answer: null, marked: false, correct: 0, header: "استيعاب المقروء - النمو والتنمية", paragraph: "كلمتي النمو والتنمية كلمتان مترابطتان، وتستخدمان جنباً إلى جنب، ويختلف النمو عن التنمية؛ فالنمو هو: تغير في الجوانب المادية، أما التنمية فهي: تطوير أشياء كثيرة، يظهر من قبل التحسين النوعي من الظروف، وتطوير عمليات معينة تفضي إلى تلبية الاحتياجات العامة، وكل منهما يعتمد على الآخر لوصف النجاح في تحقيق الأهداف أو الوصول إليها، وهما من الدراسات المهمة في العصر الحديث، ويشكلان الجزء الأكبر في حياتنا لحدوث التغيير المصاحب للتنمية، وذلك كعملية توسع اقتصادي في ظل تنظيمات معينة. وعلى الرغم من أن النمو والتنمية هما عمليتان تؤثران في بعضهما البعض، إلا أن النمو قد يحدث على الرغم من عدم وجود التنمية، ومن الممكن أن يحدث تنمية دون وجود النمو، ولكن في بعض الأحيان يحتاج النمو إلى التنمية ليصل ويحقق أهدافه، النمو والتنمية هما ليسا نفسهما، ولكن للوصول إليهما معاً، يجب تحديد الأهداف وإنجازها بوجود الإرادة، فهاتان العمليتان تسيران جنباً إلى جنب." },
    { id: 58, text: "معنى التغيير المصاحب للتنمية:", options: ["المؤثر فيها", "المداهن لها", "الموازي لها", "المعارض لها"], answer: null, marked: false, correct: 2 },
    { id: 59, text: "علاقة النمو بالتنمية:", options: ["من الضروري أن تؤدي التنمية إلى النمو", "التنمية متعلقة بالنمو", "النمو والتنمية لا يؤدي أي منهما إلى الآخر", "النمو متعلق بالتنمية"], answer: null, marked: false, correct: 0 },
    { id: 60, text: "الفقرة الأولى (النمو والتنمية) تتحدث عن:", options: ["التعريف", "الآثار", "التاريخ", "المقارنة"], answer: null, marked: false, correct: 0 },
    { id: 61, text: "أفضل عنوان لعموم النص (الزيت) هو:", options: ["أنواع الزيوت", "مشتقات الزيت", "اكتشاف الزيت وخواصه", "صناعة الزيت وآثارها"], answer: null, marked: false, correct: 2, header: "استيعاب المقروء - الزيت", 
      paragraph: "عرف الإنسان الزيت من قديم الزمان واستعمله في احتياجاته كالبناء والطلاء، وتعبيد الطرق، ومداواة الجروح. ولكن افتقار الإنسان إلى الأساليب الاقتصادية التي تمكنه من استخراج الزيت على نطاق واسع قلل فرص الانتفاع به، وجعل طرق الاستفادة منه محدودة، وقبل نهاية النصف الأول من القرن التاسع عشر حفر أول بئر لاستخراج الزيت من باطن الأرض، وكانت هذه إشارة البدء في للتنقيب في الزيت. وبعدها أصبح الزيت سمة هذا العصر ودعامته للصناعة، فقد أحدث الوقود البترولي السائل تغيراً جذرياً في حياة البشر... (تم اختصار النص للاختصار)" },
    { id: 62, text: "أقرب تاريخ لحفر أول بئر زيت (قبل نهاية النصف الأول من ق19):", options: ["1920", "1851", "1820", "1950"], answer: null, marked: false, correct: 2 },
    { id: 63, text: "تعتبر كلمة بترول في الفقرة (4):", options: ["ترادف كلمة (زيت)", "اسم لأحد مشتقات الزيت", "قريبة لكلمة (زيت)", "اسم لأحد مشتقات الزيت الثقيلة"], answer: null, marked: false, correct: 0 },
    { id: 64, text: "معنى كلمة 'سمة' في الفقرة الثانية:", options: ["نظرة", "خاصية", "حاجة", "أساس"], answer: null, marked: false, correct: 3 },
    { id: 65, text: "المقصود بـ (الأساليب الاقتصادية) في فقرة (1):", options: ["المتقدمة تقنياً", "الأسهل استعمالاً", "المتوفرة اقتصادياً", "المجدية مادياً"], answer: null, marked: false, correct: 0 },
    { id: 66, text: "ما وظيفة الكيروسين؟", options: ["لتوليد الكهرباء", "للإنارة والتدفئة والطهو", "لصناعة الطلاء", "لصناعة الطائرات"], answer: null, marked: false, correct: 1 },
    { id: 67, text: "لماذا يعد الوقود البترولي مميزًا عن الفحم؟", options: ["لأنه سائل", "لأنه رخيص", "احتراقه يكاد يكون كاملاً دون رماد", "لسهولة نقله فقط"], answer: null, marked: false, correct: 2 },
    { id: 68, text: "ماذا أحدث الوقود البترولي السائل في حياة البشر؟", options: ["تطور صناعة الفحم", "تغيرًا جذريًا", "صنع محركات الاحتراق الداخلي", "صعوبة في النقل"], answer: null, marked: false, correct: 1 },
    { id: 69, text: "من أول من صنع الأحذية؟", options: ["الرومان", "البريطانيون", "المصريون", "العرب"], answer: null, marked: false, correct: 2 },
    { id: 70, text: "ما هي المادة التي كان يستخدمها المصريون في صناعة الأحذية؟", options: ["الجلد أو ورق البردي", "المطاط", "الخشب", "النحاس"], answer: null, marked: false, correct: 0 },
    { id: 71, text: "لماذا كان المصريون يرفعون مقدمة الصندل للأعلى؟", options: ["للتزيين", "لحماية إبهام القدمين", "لمواكبة الموضة", "لجعله يتلف بسرعة"], answer: null, marked: false, correct: 1 },
    { id: 72, text: "ما اسم الأحذية التي صنعها الرومان؟", options: ["كالسيوس", "صندل", "حذوة", "لبادات"], answer: null, marked: false, correct: 0 },
    { id: 73, text: "متى بدأ الإنجليز في صناعة الأحذية بفردة يمين وأخرى يسار؟", options: ["قبل الرومان", "بعد الرومان", "قبل المصريين", "في نفس عصر المصريين"], answer: null, marked: false, correct: 1 },
    { id: 74, text: "كم شقًا كانت للأحذية الرومانية؟", options: ["4", "6", "8", "10"], answer: null, marked: false, correct: 2 },

    // القسم 4 (75-99)
    { id: 75, text: "في أي وقت بدأ التنقيب عن الزيت على نطاق واسع؟", options: ["النصف الأول من ق19", "قبل نهاية النصف الأول من ق19", "القرن 20", "قبل القرن 18"], answer: null, marked: false, correct: 1, header: "استيعاب المقروء - تكرار" },
    { id: 76, text: "ما المادة التي لا يتوافق النص معها؟", options: ["الإسفلت", "البنزين", "الكيروسين", "الفحم"], answer: null, marked: false, correct: 3 },
    { id: 77, text: "ما أهمية الإسفلت؟", options: ["يستخدم للإنارة", "يستخدم في صناعة الأحذية الرياضية", "يستخدم لطلاء المنازل", "يستخدم كوقود"], answer: null, marked: false, correct: 1 },
    { id: 78, text: "لماذا لم يكن الإنسان ينتفع بالزيت على نطاق واسع في الماضي؟", options: ["لعدم وجود طلب", "لافتقاره للأساليب الاقتصادية للاستخراج", "لأن الزيت كان يتلف بسرعة", "لأن الزيت كان قليلاً"], answer: null, marked: false, correct: 1 },
    { id: 79, text: "ما الفرق بين النمو والتنمية؟", options: ["النمو تطوير والتنمية تغير مادي", "كلاهما مترادفان", "النمو تغير مادي والتنمية تطوير", "النمو مادي فقط والتنمية غير مادية فقط"], answer: null, marked: false, correct: 2 },
    { id: 80, text: "ما العلاقة بين النمو والتنمية؟", options: ["كلاهما لا يؤثر في الآخر", "كلاهما يعتمد على الآخر لوصف النجاح", "النمو أهم من التنمية", "التنمية أهم من النمو"], answer: null, marked: false, correct: 1 },
    { id: 81, text: "ما الذي يشكل الجزء الأكبر في حياتنا لحدوث التغيير المصاحب للتنمية؟", options: ["التوسع الاجتماعي", "التوسع الاقتصادي", "التوسع العمراني", "التوسع الثقافي"], answer: null, marked: false, correct: 1 },
    { id: 82, text: "متى يحدث النمو والتنمية معًا؟", options: ["بتحديد الأهداف وإنجازها بوجود الإرادة", "عندما يسبق النمو التنمية", "عندما تسبق التنمية النمو", "عندما لا يحدث أي منهما"], answer: null, marked: false, correct: 0 },
    { id: 83, text: "ما الضرر الذي تسببه الأحذية الخشبية؟", options: ["ثقيلة وتسبب التزحلق", "قصيرة العمر وتتمزق", "صعبة اللبس", "غالية الثمن"], answer: null, marked: false, correct: 0 },
    { id: 84, text: "لماذا كان البنزين لا يكاد يفي بالطلب المتزايد عليه؟", options: ["لقلة الطلب", "لأنه ينتج عن الزيت الخام", "لأن نسبة البنزين في الزيت الخام ضئيلة", "لأنه مادة عازلة"], answer: null, marked: false, correct: 2 },
    { id: 85, text: "العلاقة بين 'النمو' و 'التغير في الجوانب المادية':", options: ["تضاد", "ترادف", "تعريف", "سبب ونتيجة"], answer: null, marked: false, correct: 2 },
    { id: 86, text: "العبارة 'من شغل نفسه بعيوب غيره كثرت عيوبه' تعني:", options: ["الذي يركز على عيوب الناس يزيد من عيوبه", "الذي يرى عيوبه يقلل منها", "الذي يركز على عيوب الناس لا يهتم بعيوبه", "كل ما سبق"], answer: null, marked: false, correct: 0 },
    { id: 87, text: "تستطيع حشرة السمك التغذي على أغلفة الكتب لأنها:", options: ["مصنوعة من القماش", "مصنوعة من الورق", "تحتوي على السكريات", "غير نظيفة"], answer: null, marked: false, correct: 1 },
    { id: 88, text: "ما الفرق الرئيسي في شكل طفح الجدري والجديري؟", options: ["اللون", "الحجم", "مكان الظهور ووقت التحول", "مدة العلاج"], answer: null, marked: false, correct: 2 },
    { id: 89, text: "أوجد قيمة المقدار: $\\frac{1}{3} + (\\frac{1}{2} \\times \\frac{1}{3}) – \\frac{1}{6} - \\frac{1}{3}$", options: ["1/6", "0", "2", "3"], answer: null, marked: false, correct: 1, header: "الجبر والحساب" },
    { id: 90, text: "بطاقات مرقمة من 1 إلى 99، فما احتمال سحب بطاقة مجموع رقميها أكبر من 11؟", options: ["10/99", "11/99", "27/99", "28/99"], answer: null, marked: false, correct: 3 },
    { id: 91, text: "$10^6 – 1 = .....$", options: ["99800", "998000", "999999", "980000"], answer: null, marked: false, correct: 2 },
    { id: 92, text: "كم مرة يتكرر الرقم ٩ من ١ الى ١٠٠؟", options: ["19", "20", "21", "22"], answer: null, marked: false, correct: 1 },
    { id: 93, text: "ما قيمة المقدار تقريباً: $\\frac{10}{\\sqrt{30} \\times \\sqrt{10}}$", options: ["1/\\sqrt{3}", "1/3", "1/10", "1/30"], answer: null, marked: false, correct: 0 },
    { id: 94, text: "ما نصف العدد $2^{50}$", options: ["$2^{62}$", "$2^{52}$", "$2^{49}$", "$2^{51}$"], answer: null, marked: false, correct: 2 },
    { id: 95, text: "إذا كان $2^n + 2^n + 2^n +2^n = 8^2$ فما قيمة $n$؟", options: ["2", "8", "4", "6"], answer: null, marked: false, correct: 2 },
    { id: 96, text: "أوجد قيمة المقدار: $\\frac{18 \\times 32}{16 \\times 9}$", options: ["1", "2", "4", "6"], answer: null, marked: false, correct: 2 },
    { id: 97, text: "شخص عمره 4.15 سنة، فعمره تقريبًا 4 سنوات و .....", options: ["شهر و28 يوم", "ثلاثة أشهر", "15 يوم", "شهر و 24 يوم"], answer: null, marked: false, correct: 3 },
    { id: 98, text: "أوجد قيمة: 4% من 100", options: ["4", "3.96", "3.92", "3.84"], answer: null, marked: false, correct: 0 },
    { id: 99, text: "أوجد قيمة: $\\frac{4}{10} / \\frac{9}{10}$", options: ["4/10", "5/10", "4/9", "5/9"], answer: null, marked: false, correct: 2 },

    // القسم 5 (100-124) - يبدأ من هنا
    { id: 100, text: "ما قيمة $(51)^2 – (49)^2$", options: ["200", "400", "600", "49"], answer: null, marked: false, correct: 0, header: "الجبر والحساب - تكرار" },
    { id: 101, text: "إذا كان $أ – ب = ٥$، $ب – ج = ٣$، $ج + د = ١$، أوجد $أ + د$", options: ["1", "8", "9", "4"], answer: null, marked: false, correct: 2 },
    { id: 102, text: "أوجد قيمة المقدار: $\\frac{2^7 + 2^7}{2^7 + 2^7 + 2^7 + 2^7}$", options: ["1/4", "1/2", "1/8", "1/16"], answer: null, marked: false, correct: 1 },
    { id: 103, text: "أوجد الحد التالي: 3، 7، 9، 15، .........", options: ["19", "21", "23", "25"], answer: null, marked: false, correct: 2 },
    
    // المسائل المقالية (104-110)
    { id: 104, text: "نريد توزيع 64 حاسب و 48 طابعة على عدد من الغرف. فما أكبر عدد من هذه الغرف؟", options: ["8 غرف", "12 غرفة", "16 غرفة", "24 غرفة"], answer: null, marked: false, correct: 2, header: "الأسئلة المقالية" },
    { id: 105, text: "زادت أرباح شركة بقدار 10% كل سنة خلال 3 سنوات. فما إجمالي الأرباح بعد السنة الثالثة؟", options: ["25%", "33.1%", "35%", "30%"], answer: null, marked: false, correct: 1 },
    { id: 106, text: "أب عمره 71، وابن عمره 35، فبعد كم سنة يصبح عمر الأب مثلي عمر الابن؟", options: ["سنة", "سنتين", "8 سنين", "4 سنين"], answer: null, marked: false, correct: 0 },
    { id: 107, text: "سفينة تحمل 20 صندوق كبير أو 24 صندوق صغير. إذا حملت 15 كبير، كم صغير يمكن أن تحمل؟", options: ["4 صناديق", "6 صناديق", "8 صناديق", "10 صناديق"], answer: null, marked: false, correct: 1 },
    { id: 108, text: "مستطيل 300 × 100 سم، الورقة 30 × 20 سم. كم عدد الأوراق؟", options: ["50 ورقة", "75 ورقة", "100 ورقة", "150 ورقة"], answer: null, marked: false, correct: 0 },
    { id: 109, text: "دفع أحمد 45% وفهد 25%، وتبقى 360000 ريال. فما تكلفة بناء المسجد كاملة؟", options: ["1200000 ريال", "1400000 ريال", "2400000 ريال", "1000000 ريال"], answer: null, marked: false, correct: 0 },
    { id: 110, text: "اشترى تاجر سلعة بـ 90، يبيع بربح 50%، خصم نقدي 30%. فما نسبة ربح التاجر إذا باع نقداً؟", options: ["5%", "10%", "20%", "30%"], answer: null, marked: false, correct: 0 },

    // الهندسة (111-122)
    { id: 111, text: "في شكل شبه منحرف، أوجد س + ص (زاويتان خارجيتان).", options: ["$230^{\\circ}$", "$130^{\\circ}$", "$270^{\\circ}$", "$115^{\\circ}$"], answer: null, marked: false, correct: 0, header: "الهندسة" },
    { id: 112, text: "في الشكل المجاور أوجد طول أ ج: (أ ب = 7، ب د = 4، د ج = 4).", options: ["7", "8", "9", "10"], answer: null, marked: false, correct: 2 },
    { id: 113, text: "في شكل رباعي دائري، أوجد قيمة س (الزاوية المقابلة $80^{\\circ}$).", options: ["$80^{\\circ}$", "$100^{\\circ}$", "$110^{\\circ}$", "$120^{\\circ}$"], answer: null, marked: false, correct: 1 },
    { id: 114, text: "أحسب محيط الشكل التالي (مكون من مربعين أضلاعهما 3 و 4).", options: ["18", "20", "22", "24"], answer: null, marked: false, correct: 2 },
    { id: 115, text: "إذا كان طول ضلع المربع = 20 سم ورؤوسه مركز لأربع دوائر، أوجد مساحة المظلل (4 أرباع دائرة).", options: ["$25\\pi$", "$50\\pi$", "$100\\pi$", "$125\\pi$"], answer: null, marked: false, correct: 2 },
    { id: 116, text: "كم عدد المثلثات في الشكل (مستطيل داخله مربع مقسوم بقطرين).", options: ["8", "10", "12", "16"], answer: null, marked: false, correct: 3 },
    { id: 117, text: "أوجد نسبة الزيادة بين عامي 1433هـ (150) إلى عام 1430هـ (125).", options: ["10%", "15%", "20%", "25%"], answer: null, marked: false, correct: 2 },
    { id: 118, text: "أوجد مثلي س + ص (زاويتان حادتان في مثلث قائم).", options: ["60", "90", "120", "180"], answer: null, marked: false, correct: 3 },
    { id: 119, text: "ما قياس الزاوية س؟", options: ["$60^{\\circ}$", "$120^{\\circ}$", "$140^{\\circ}$", "$100^{\\circ}$"], answer: null, marked: false, correct: 1 },
    { id: 120, text: "ما نوع المثلث؟ (أضلاعه 4س، 3س، 2س).", options: ["مثلث قائم", "مثلث حاد", "مثلث متطابق الأضلاع", "مثلث منفرج"], answer: null, marked: false, correct: 3 },
    { id: 121, text: "ما متوسط الإيرادات للأعوام الأربعة؟ ($8+12+10+16$).", options: ["11.5", "12.5", "40", "46"], answer: null, marked: false, correct: 0 },
    { id: 122, text: "كم عدد المستطيلات في الشكل (مستطيل مقسم إلى 5 أقسام طولية).", options: ["6", "15", "18", "24"], answer: null, marked: false, correct: 1 },

    // أسئلة المقارنة (123-125)
    { id: 123, text: "قارن بين: القيمة الأولى: $9 – 0.0044$، القيمة الثانية: $9 – 0.00044$", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 1, header: "أسئلة المقارنة" },
    { id: 124, text: "قارن بين: القيمة الأولى: 40% من 60، القيمة الثانية: 60 من 40%", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 2 },
    { id: 125, text: "قارن بين: محيط سداسي منتظم قطره = 8، محيط دائرة قطرها = 8", options: ["الأولى أكبر", "الثانية أكبر", "متساويتان", "المعطيات غير كافية"], answer: null, marked: false, correct: 1 },
];

// تحديد الأسئلة الخاصة بالقسم الحالي فقط
let questions = allQuestions.slice(sectionStarts[currentSection - 1], sectionStarts[currentSection - 1] + QUESTIONS_PER_SECTION);

// دالة تنسيق النص (للكسور والجذور)
function formatText(text) {
  return text.replace(/(\\frac{([^{}]+)}{([^{}]+)})/g, (match, p1, numerator, denominator) => {
      return `<span style="font-size: 1.2em; vertical-align: middle;">${numerator}&frasl;${denominator}</span>`;
  })
  .replace(/\\sqrt{([^{}]+)}/g, (match, p1) => `&radic;<span style="text-decoration:overline">${p1}</span>`);
}

function updateQuestion() {
  const q = questions[currentIndex];
  const sectionTitleElement = document.getElementById("section-title");
  const paragraphBoxElement = document.getElementById("paragraph-box");
  const submitBtn = document.getElementById("submit-section-btn");

  // 1. تحديد عنوان القسم الرئيسي
  let currentSectionName = "";
  if (mode === 'real') {
    currentSectionName = `القسم ${currentSection} من ${totalSections}`;
  } else {
    currentSectionName = `الاختبار السريع (القسم 1)`;
  }

  // 2. إعداد محتوى عنوان القسم الرئيسي
  sectionTitleElement.innerHTML = `<h2>${currentSectionName}</h2>`;
  
  // 3. عرض عنوان الفقرة (Header)
  const prevHeader = currentIndex > 0 ? questions[currentIndex - 1].header : null;
  if (q.header && q.header !== prevHeader) {
      sectionTitleElement.innerHTML += `<h3 style="color: #023e8a; margin-top: 10px;">${q.header}</h3>`;
  }

  // 4. عرض الفقرة الطويلة (Paragraph) في العنصر المخصص لها
  const prevParagraph = currentIndex > 0 ? questions[currentIndex - 1].paragraph : null;
  if (q.paragraph) {
      if (q.paragraph !== prevParagraph) {
          paragraphBoxElement.innerHTML = `<div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; text-align: justify;"><p>${q.paragraph}</p></div>`;
          paragraphBoxElement.style.display = 'block';
      } else {
          paragraphBoxElement.style.display = 'block';
      }
  } else {
      paragraphBoxElement.innerHTML = '';
      paragraphBoxElement.style.display = 'none';
  }

  // 5. عرض رقم السؤال
  sectionTitleElement.innerHTML += `<p>السؤال ${currentIndex + 1} من ${questions.length}</p>`;

  // 6. عرض نص السؤال وتنسيق الكسور
  document.getElementById("question-text").innerHTML = formatText(q.text);

  let answersHTML = "";
  q.options.forEach((opt, i) => {
    if (opt) {
        answersHTML += `<label><input type="radio" name="answer" value="${i}" ${q.answer === i ? "checked" : ""}> ${formatText(opt)}</label>`;
    }
  });
  document.getElementById("answers").innerHTML = answersHTML;

  // 7. تحديث نص زر التسليم/الإنهاء
  if (currentSection < totalSections) {
      submitBtn.textContent = `✅ تسليم القسم ${currentSection} والانتقال للتالي`;
      submitBtn.onclick = endSection;
  } else {
      submitBtn.textContent = `🏁 إنهاء الامتحان`;
      submitBtn.onclick = finishExam; // القسم الأخير ينهي الامتحان مباشرة
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
  } else if (currentIndex === questions.length - 1) {
    // إذا وصل لآخر سؤال في القسم (السؤال 25)، ينتقل لشاشة المراجعة مباشرة
    reviewSection();
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
  // حفظ حالة القسم قبل الانتقال للمراجعة
  localStorage.setItem(`section_questions_${currentSection}`, JSON.stringify(questions));

  let html = `<h2>مراجعة القسم ${currentSection}</h2><ul>`;
  questions.forEach((q, i) => {
    let status = q.answer !== null ? "✅ مجاب" : "❌ غير مجاب";
    if (q.marked) status += " ⭐ مرجعي";
    html += `<li>سؤال ${i + 1}: ${status} <button onclick="window.location.href='quiz.html?section=${currentSection}&returnTo=${i}'">🔁</button></li>`;
  });
  
  // تحديد نص زر الإنهاء بناءً على القسم
  const endButtonText = (currentSection < totalSections) ? '✅ تسليم القسم والانتقال' : '🏁 إنهاء الاختبار';

  html += `</ul>
    <button onclick="window.location.href='quiz.html?section=${currentSection}&returnTo=0'">🔙 العودة لأول سؤال</button>
    <button onclick="endSection()">${endButtonText}</button>`;
    
  // استبدال محتوى الجسم بشاشة المراجعة
  document.body.innerHTML = html;
}

function endSection() {
  saveAnswer();
  
  // حفظ أسئلة القسم الحالي
  localStorage.setItem(`section_questions_${currentSection}`, JSON.stringify(questions));

  if (currentSection < totalSections) {
    // الانتقال للقسم التالي
    localStorage.setItem("section", currentSection + 1);
    window.location.href = "quiz.html";
  } else {
    // إنهاء الامتحان بالكامل (القسم الأخير)
    finishExam();
  }
}

function finishExam() {
  saveAnswer();
  let errors = [];
  let totalCorrectAnswers = 0;
  let totalQuestionsCount = 0;
  const optionLabels = ["أ", "ب", "ج", "د"];

  for (let i = 1; i <= totalSections; i++) {
      const savedSection = localStorage.getItem(`section_questions_${i}`);
      if (savedSection) {
          const sectionQuestions = JSON.parse(savedSection);
          totalQuestionsCount += sectionQuestions.length;
          
          sectionQuestions.forEach((q, indexInSection) => {
              // 1. حساب الإجابات الصحيحة
              if (q.answer !== null && q.answer === q.correct) {
                  totalCorrectAnswers++;
              } else if (q.answer !== q.correct) {
                  // 2. تسجيل الأخطاء (إذا لم يتم الإجابة أو كانت الإجابة خاطئة)
                  const questionNumber = indexInSection + 1;
                  errors.push({
                      section: i,
                      question: questionNumber,
                      text: q.text,
                      userAnswer: q.answer !== null ? q.options[q.answer] : "لم تتم الإجابة",
                      correctAnswer: q.options[q.correct],
                      correctLabel: q.options[q.correct] ? optionLabels[q.correct] : 'غير محدد' 
                  });
              }
          });
      }
  }

  const finalScore = (totalCorrectAnswers * 0.83).toFixed(2);
  
  // تخزين تقرير الأخطاء المفصل
  localStorage.setItem("quizResults", JSON.stringify({
    score: finalScore,
    correct: totalCorrectAnswers,
    total: totalQuestionsCount,
    errors: errors,
    totalSections: totalSections
  }));
  
  // تنظيف التخزين الخاص بالأقسام
  for (let i = 1; i <= totalSections; i++) {
      localStorage.removeItem(`section_questions_${i}`);
  }

  window.location.href = "thankyou.html";
}

// ** منطق التحميل والتخزين للقسم الحالي (عند تحميل الصفحة) **
document.addEventListener('DOMContentLoaded', () => {
    // 1. تحديد بداية الأسئلة للقسم الحالي من المصفوفة الكلية
    const start = sectionStarts[currentSection - 1];
    const end = start + QUESTIONS_PER_SECTION;
    questions = allQuestions.slice(start, end);
    
    // 2. محاولة استعادة الأسئلة من التخزين المحلي (للحالة المحفوظة)
    const savedSectionQuestions = localStorage.getItem(`section_questions_${currentSection}`);
    if (savedSectionQuestions) {
        questions = JSON.parse(savedSectionQuestions);
    } 
    
    // 3. التحقق من وجود رقم سؤال محدد للعودة إليه من URL
    const urlParams = new URLSearchParams(window.location.search);
    const returnToIndex = urlParams.get('returnTo');
    if (returnToIndex !== null) {
        currentIndex = parseInt(returnToIndex);
    } else {
        currentIndex = 0;
    }
    
    updateQuestion();

    // 4. إزالة زر إنهاء الامتحان القديم (end-exam) إذا وجد، لضمان استخدام زر واحد
    const oldEndExamBtn = document.getElementById("end-exam");
    if (oldEndExamBtn) {
        oldEndExamBtn.remove();
    }

    // 5. يتم مسح معاملات URL لضمان بداية نظيفة في المرة القادمة
    window.history.replaceState({}, document.title, "quiz.html");

});


// عداد الوقت
setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    document.getElementById("timer").textContent = `الوقت المتبقي: ${min}:${sec < 10 ? "0" + sec : sec}`;
  } else {
    // عند انتهاء الوقت، ننتقل مباشرة لشاشة المراجعة
    reviewSection();
  }
}, 1000);
