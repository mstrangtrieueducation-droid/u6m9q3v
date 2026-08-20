export type LessonPoint = {
  label: string;
  rule: string;
  example: string;
  explanation: string;
};

export type LessonData = {
  session: string;
  unit: string;
  title: string;
  titleVi: string;
  question: string;
  overview: string;
  points: LessonPoint[];
  contrasts: { left: string; right: string; note: string }[];
  mistakes: { wrong: string; right: string; why: string }[];
  academic: { sentence: string; use: string }[];
};

export const lessons: Record<string, LessonData> = {
  "01": {
    session: "01", unit: "01", title: "Present Forms", titleVi: "Các thì hiện tại",
    question: "Người nói đang tập trung vào thói quen, khoảnh khắc, kết quả hay quá trình?",
    overview: "Bốn thì hiện tại không khác nhau chỉ ở công thức. Điểm quyết định là cách người nói nhìn hành động: ổn định, đang diễn ra, đã có kết quả hay còn kéo dài.",
    points: [
      { label: "Present Simple", rule: "S + V(s/es)", example: "The course starts at 8 a.m.", explanation: "Dùng cho sự thật, thói quen và cả lịch trình cố định trong tương lai." },
      { label: "Present Continuous", rule: "S + am/is/are + V-ing", example: "I am meeting my tutor tomorrow.", explanation: "Nhấn mạnh việc đang diễn ra, tạm thời hoặc một cuộc hẹn đã sắp xếp." },
      { label: "Present Perfect", rule: "S + have/has + V3", example: "Researchers have identified three causes.", explanation: "Sự việc xảy ra trước hiện tại nhưng kết quả hoặc trải nghiệm vẫn liên quan lúc nói." },
      { label: "Present Perfect Continuous", rule: "S + have/has been + V-ing", example: "The population has been increasing steadily.", explanation: "Nhấn mạnh quá trình, thời lượng hoặc xu hướng kéo dài đến hiện tại." },
    ],
    contrasts: [
      { left: "I read every evening.", right: "I am reading now.", note: "Thói quen ổn định khác hành động tại thời điểm nói." },
      { left: "I have written three pages.", right: "I have been writing for two hours.", note: "Kết quả đếm được khác quá trình kéo dài." },
      { left: "The train leaves at 6.", right: "I am leaving at 6.", note: "Lịch trình chính thức khác kế hoạch cá nhân đã sắp xếp." },
    ],
    mistakes: [
      { wrong: "She work as a nurse.", right: "She works as a nurse.", why: "Chủ ngữ số ít ở hiện tại đơn cần -s/-es." },
      { wrong: "I am knowing the answer.", right: "I know the answer.", why: "Know là động từ trạng thái nên thường không dùng tiếp diễn." },
      { wrong: "I have seen her yesterday.", right: "I saw her yesterday.", why: "Yesterday là mốc quá khứ đã kết thúc." },
    ],
    academic: [
      { sentence: "The chart shows a gradual rise in demand.", use: "Mô tả điều biểu đồ thể hiện bằng Present Simple." },
      { sentence: "Online learning has become increasingly common.", use: "Nêu thay đổi kéo dài tới hiện tại bằng Present Perfect." },
    ],
  },
  "03": {
    session: "03", unit: "02", title: "Past Forms", titleVi: "Các thì quá khứ",
    question: "Sự việc là một mốc đã kết thúc, bối cảnh đang diễn ra, hay xảy ra trước một mốc quá khứ khác?",
    overview: "Muốn chọn đúng thì quá khứ, trước hết hãy dựng trục thời gian. Past Simple kể sự kiện; Past Continuous dựng bối cảnh; Past Perfect lùi thêm một bước; Past Perfect Continuous nhấn mạnh độ dài của quá trình trước mốc đó.",
    points: [
      { label: "Past Simple", rule: "S + V2/ed", example: "The company opened a new branch in 2024.", explanation: "Một sự kiện đã hoàn tất tại thời điểm quá khứ xác định." },
      { label: "Past Continuous", rule: "S + was/were + V-ing", example: "Sales were falling when the policy changed.", explanation: "Hành động đang diễn ra làm nền cho một sự kiện chen vào." },
      { label: "Past Perfect", rule: "S + had + V3", example: "Demand had declined before prices were reduced.", explanation: "Hành động hoàn tất trước một mốc hoặc sự kiện quá khứ khác." },
      { label: "Past Perfect Continuous", rule: "S + had been + V-ing", example: "The economy had been growing for years.", explanation: "Nhấn mạnh quá trình kéo dài cho tới một mốc trong quá khứ." },
    ],
    contrasts: [
      { left: "When I arrived, they left.", right: "When I arrived, they had left.", note: "Câu thứ nhất có thể là hai hành động nối tiếp; câu thứ hai cho biết họ rời đi trước khi tôi đến." },
      { left: "She wrote for two hours.", right: "She had been writing for two hours before dinner.", note: "Câu sau gắn thời lượng với một mốc quá khứ khác." },
      { left: "I used to walk to school.", right: "I would walk to school every day.", note: "Used to dùng được cho trạng thái và thói quen; would chỉ phù hợp với hành động lặp lại." },
    ],
    mistakes: [
      { wrong: "When I came, he watched TV.", right: "When I came, he was watching TV.", why: "Việc xem TV đang diễn ra thì hành động đến chen vào." },
      { wrong: "After she finished, she went home.", right: "After she had finished, she went home.", why: "Past Perfect làm rõ hành động hoàn tất trước; Past Simple vẫn có thể dùng nếu trật tự đã rõ." },
      { wrong: "I would be shy as a child.", right: "I used to be shy as a child.", why: "Would không thường dùng cho trạng thái quá khứ." },
    ],
    academic: [
      { sentence: "The figure fell sharply in 2019 before recovering the following year.", use: "Past Simple để mô tả chuỗi mốc đã kết thúc." },
      { sentence: "By 2010, the city had already doubled in size.", use: "Past Perfect thể hiện kết quả đạt được trước mốc 2010." },
    ],
  },
  "05": {
    session: "05", unit: "03", title: "Future Forms", titleVi: "Các cách diễn đạt tương lai",
    question: "Đó là quyết định tức thời, dự định có sẵn, lịch trình cố định, kế hoạch đã sắp xếp hay một mốc sẽ hoàn tất?",
    overview: "Tiếng Anh không có một công thức tương lai dùng cho mọi tình huống. Người học cần chọn cấu trúc theo mức độ chủ động, bằng chứng, sự sắp xếp và mốc thời gian.",
    points: [
      { label: "Will", rule: "S + will + V", example: "I will send the file now.", explanation: "Quyết định ngay lúc nói, lời hứa hoặc dự đoán dựa trên ý kiến." },
      { label: "Be going to", rule: "S + be going to + V", example: "Look at the clouds. It is going to rain.", explanation: "Dự định đã có hoặc dự đoán dựa trên bằng chứng hiện tại." },
      { label: "Present forms", rule: "Present Simple / Continuous", example: "The seminar starts at nine; I am meeting Lan there.", explanation: "Hiện tại đơn cho lịch trình; hiện tại tiếp diễn cho kế hoạch cá nhân đã chốt." },
      { label: "Future perfect forms", rule: "will have + V3 / will have been + V-ing", example: "By 2030, the project will have created 500 jobs.", explanation: "Nhìn từ một mốc tương lai về kết quả hoàn tất hoặc quá trình kéo dài." },
    ],
    contrasts: [
      { left: "I think prices will rise.", right: "Prices are going to rise; demand is surging.", note: "Will dựa trên nhận định; going to dựa trên dấu hiệu hiện có." },
      { left: "The flight leaves at 7.", right: "We are leaving at 7.", note: "Lịch hãng bay khác kế hoạch của người tham gia." },
      { left: "This time tomorrow, I will be flying.", right: "By tomorrow, I will have arrived.", note: "Một câu nhấn hành động đang diễn ra; câu kia nhấn kết quả đã hoàn tất." },
    ],
    mistakes: [
      { wrong: "When she will arrive, call me.", right: "When she arrives, call me.", why: "Sau liên từ thời gian dùng hiện tại thay vì will." },
      { wrong: "I am going to go to London next week.", right: "I am going to London next week.", why: "Với go/come, hiện tại tiếp diễn thường tự nhiên hơn." },
      { wrong: "By 8, she will finish.", right: "By 8, she will have finished.", why: "By + mốc tương lai thường hướng tới kết quả hoàn tất trước mốc." },
    ],
    academic: [
      { sentence: "The proportion is projected to reach 60% by 2035.", use: "Dự báo học thuật, thường dùng bị động với projected/expected." },
      { sentence: "By the end of the period, emissions will have fallen considerably.", use: "Nhấn mức thay đổi hoàn tất trước điểm cuối biểu đồ." },
    ],
  },
  "07": {
    session: "07", unit: "04.1", title: "Infinitive and -ing Forms", titleVi: "Động từ nguyên mẫu và V-ing",
    question: "Động từ sau đang diễn tả mục đích, một hoạt động, hay đi theo mẫu cố định của từ đứng trước?",
    overview: "Không thể chọn to V hay V-ing chỉ bằng dịch nghĩa tiếng Việt. Hãy nhận diện chức năng trong câu và học theo cụm động từ, tính từ hoặc giới từ đi kèm.",
    points: [
      { label: "To-infinitive", rule: "to + V", example: "The government aims to reduce waste.", explanation: "Thường diễn tả mục đích hoặc theo sau các động từ như decide, hope, promise, manage." },
      { label: "Bare infinitive", rule: "V nguyên mẫu không to", example: "The policy can reduce inequality.", explanation: "Theo sau modal verbs và một số cấu trúc như let/make + object + V." },
      { label: "Gerund", rule: "V-ing như danh từ", example: "Reducing waste requires public support.", explanation: "Làm chủ ngữ, tân ngữ hoặc theo sau giới từ." },
      { label: "Fixed patterns", rule: "verb/adjective/preposition + form", example: "They succeeded in reducing costs.", explanation: "Succeed in đi với V-ing; manage đi với to V. Cần học theo cụm." },
    ],
    contrasts: [
      { left: "I enjoy reading.", right: "I want to read.", note: "Enjoy nhận V-ing; want nhận to V. Đây là mẫu cố định cần học theo động từ." },
      { left: "He made me wait.", right: "He wants me to wait.", note: "Make + object + V không to; want + object + to V." },
      { left: "It is useful to compare data.", right: "Comparing data is useful.", note: "Hai cấu trúc đều đúng nhưng thay đổi điểm đặt thông tin." },
    ],
    mistakes: [
      { wrong: "They suggested to build a park.", right: "They suggested building a park.", why: "Suggest đi với V-ing, không đi với to V." },
      { wrong: "He made me to wait.", right: "He made me wait.", why: "Make + object + bare infinitive ở câu chủ động." },
      { wrong: "She is interested to learn languages.", right: "She is interested in learning languages.", why: "Sau giới từ in dùng V-ing." },
    ],
    academic: [
      { sentence: "Investing in public transport can reduce congestion.", use: "V-ing làm chủ ngữ cho một nhận định khái quát." },
      { sentence: "The policy aims to encourage sustainable consumption.", use: "Aim to V diễn tả mục tiêu chính sách." },
    ],
  },
  "09": {
    session: "09", unit: "04.2", title: "Meaning Changes and Participles", titleVi: "Đổi nghĩa với to V/V-ing và phân từ",
    question: "Cùng một động từ, người nói đang nhắc việc cần làm, việc đã xảy ra hay thay đổi sang một hành động khác?",
    overview: "Ở nhóm remember, forget, regret, stop, try và go on, việc đổi giữa to V và V-ing làm đổi nghĩa. Phân từ còn giúp rút gọn mệnh đề và thể hiện quan hệ chủ động/bị động.",
    points: [
      { label: "Remember / forget", rule: "to V = nhớ/quên việc cần làm; V-ing = nhớ/quên việc đã làm", example: "Remember to lock the door; I remember locking it.", explanation: "Mốc thời gian của hành động quyết định cấu trúc." },
      { label: "Stop / go on", rule: "to V = chuyển mục đích; V-ing = dừng/tiếp tục hoạt động", example: "He stopped to rest; he stopped working.", explanation: "To V trả lời 'để làm gì'; V-ing gọi tên hoạt động." },
      { label: "Try / regret", rule: "try to V = nỗ lực; try V-ing = thử cách", example: "Try restarting the device.", explanation: "V-ing gợi ý một phương án; to V nhấn nỗ lực đạt mục tiêu." },
      { label: "Participles", rule: "V-ing chủ động; V3/ed bị động/hoàn tất", example: "Students living abroad face challenges.", explanation: "Rút gọn mệnh đề quan hệ khi chủ ngữ hai mệnh đề phù hợp." },
    ],
    contrasts: [
      { left: "I regret to inform you...", right: "I regret saying that.", note: "Tiếc khi sắp thông báo khác hối tiếc về việc đã nói." },
      { left: "The data collected in 2025...", right: "Researchers collecting the data...", note: "Collected mang nghĩa bị động; collecting mang nghĩa chủ động." },
      { left: "He went on to discuss costs.", right: "He went on discussing costs.", note: "Chuyển sang ý mới khác tiếp tục cùng chủ đề." },
    ],
    mistakes: [
      { wrong: "Remember locking the door tonight.", right: "Remember to lock the door tonight.", why: "Việc khóa cửa chưa xảy ra nên dùng to V." },
      { wrong: "The report writing last year was useful.", right: "The report written last year was useful.", why: "Report chịu hành động viết nên dùng past participle." },
      { wrong: "Walking down the street, the rain started.", right: "Walking down the street, I saw the rain start.", why: "Chủ thể của cụm phân từ phải khớp với chủ ngữ mệnh đề chính." },
    ],
    academic: [
      { sentence: "Evidence collected from three surveys supports this view.", use: "Past participle rút gọn mệnh đề bị động 'which was collected'." },
      { sentence: "Governments should try introducing targeted subsidies.", use: "Try V-ing đề xuất thử một biện pháp." },
    ],
  },
  "11": {
    session: "11", unit: "05.1", title: "Modal Verbs", titleVi: "Động từ tình thái",
    question: "Người nói muốn thể hiện khả năng, mức chắc chắn, nghĩa vụ, sự cho phép hay lời khuyên?",
    overview: "Modal verbs không kể hành động; chúng cho biết thái độ của người nói với hành động đó. Cùng một sự việc, đổi modal là đổi mức độ chắc chắn hoặc sức ép.",
    points: [
      { label: "Ability", rule: "can / could / be able to", example: "The system can process large datasets.", explanation: "Can cho khả năng chung; was able to thường nhấn thành công ở một tình huống cụ thể." },
      { label: "Possibility", rule: "may / might / could", example: "The policy may reduce unemployment.", explanation: "Diễn tả khả năng, tránh khẳng định tuyệt đối trong văn học thuật." },
      { label: "Obligation", rule: "must / have to / should", example: "Factories must comply with safety rules.", explanation: "Ở đây must mang nghĩa 'phải', diễn tả nghĩa vụ mạnh; have to thiên về yêu cầu bên ngoài; should là lời khuyên." },
      { label: "Suy luận từ bằng chứng", rule: "must be = hẳn là; can't be = không thể là", example: "This result must be incorrect.", explanation: "Ở đây must không mang nghĩa 'phải'. Must be diễn tả suy luận gần như chắc chắn; can't be diễn tả điều gần như không thể đúng." },
    ],
    contrasts: [
      { left: "You must leave now.", right: "You should leave now.", note: "Nghĩa vụ mạnh khác lời khuyên." },
      { left: "I could swim at five.", right: "I was able to escape.", note: "Khả năng chung trong quá khứ khác thành công ở một lần cụ thể." },
      { left: "It may be true.", right: "It must be true.", note: "Khả năng mở khác suy luận rất chắc chắn." },
    ],
    mistakes: [
      { wrong: "He cans speak French.", right: "He can speak French.", why: "Modal verb không chia theo ngôi." },
      { wrong: "You must to wear a helmet.", right: "You must wear a helmet.", why: "Modal verb đi với bare infinitive." },
      { wrong: "She doesn't can come.", right: "She cannot come.", why: "Phủ định trực tiếp với modal, không dùng do/does." },
    ],
    academic: [
      { sentence: "This trend may place additional pressure on public services.", use: "May giúp trình bày hệ quả thận trọng." },
      { sentence: "Governments should prioritise preventive healthcare.", use: "Should đưa ra khuyến nghị có mức độ hợp lý." },
    ],
  },
  "13": {
    session: "13", unit: "05.2", title: "Perfect Modals", titleVi: "Dạng hoàn thành của động từ tình thái",
    question: "Người nói đang suy đoán, phê bình hay nói về một khả năng đã không xảy ra trong quá khứ?",
    overview: "Modal + have + V3 nhìn ngược về quá khứ. Cấu trúc này không chỉ thể hiện thời gian mà còn bộc lộ mức chắc chắn, sự tiếc nuối hoặc đánh giá của người nói.",
    points: [
      { label: "Past possibility", rule: "may/might/could have + V3", example: "The decline may have resulted from inflation.", explanation: "Đưa ra một nguyên nhân có thể đã xảy ra nhưng chưa chắc chắn." },
      { label: "Past deduction", rule: "must/can't have + V3", example: "They must have misunderstood the data.", explanation: "Suy luận rất chắc chắn về điều đã xảy ra hoặc không thể xảy ra." },
      { label: "Criticism / regret", rule: "should/ought to have + V3", example: "The company should have acted earlier.", explanation: "Việc đúng ra cần làm nhưng đã không làm." },
      { label: "Unrealised ability", rule: "could have + V3", example: "The reform could have created more jobs.", explanation: "Khả năng trong quá khứ đã không được hiện thực hóa." },
    ],
    contrasts: [
      { left: "He may have left.", right: "He must have left.", note: "Khả năng không chắc khác suy luận gần như chắc chắn." },
      { left: "You should have called.", right: "You had to call.", note: "Phê bình việc không làm khác nghĩa vụ thực tế trong quá khứ." },
      { left: "They couldn't have known.", right: "They needn't have worried.", note: "Không thể đã biết khác đã lo nhưng việc lo là không cần thiết." },
    ],
    mistakes: [
      { wrong: "She must had forgotten.", right: "She must have forgotten.", why: "Sau modal dùng have nguyên mẫu rồi V3." },
      { wrong: "They should have went.", right: "They should have gone.", why: "Sau have dùng past participle." },
      { wrong: "He needn't worry, but he did.", right: "He needn't have worried.", why: "Nói về việc đã xảy ra nhưng không cần thiết phải dùng perfect modal." },
    ],
    academic: [
      { sentence: "The discrepancy may have been caused by sampling error.", use: "Suy đoán học thuật thận trọng ở dạng bị động." },
      { sentence: "Policymakers should have considered the long-term costs.", use: "Đánh giá phê bình một quyết định trong quá khứ." },
    ],
  },
  "15": {
    session: "15", unit: "06", title: "The Passive", titleVi: "Câu bị động",
    question: "Điều quan trọng hơn là người thực hiện hay hành động, kết quả và đối tượng chịu tác động?",
    overview: "Câu bị động chuyển trọng tâm sang đối tượng hoặc kết quả. Nó đặc biệt hữu ích trong mô tả quy trình, báo cáo và văn học thuật, nơi tác nhân có thể không biết, không quan trọng hoặc đã rõ.",
    points: [
      { label: "Core form", rule: "be + V3", example: "The samples were analysed in a laboratory.", explanation: "Chia be theo thì cần dùng; V3 giữ nguyên." },
      { label: "Agent", rule: "by + người/vật gây ra hành động", example: "The theory was proposed by Darwin.", explanation: "Chỉ thêm tác nhân khi thông tin đó quan trọng hoặc chưa rõ." },
      { label: "Two objects", rule: "O1/O2 + be + V3", example: "Participants were given a questionnaire.", explanation: "Động từ có hai tân ngữ thường cho phép hai dạng bị động." },
      { label: "Reporting passive", rule: "It is believed that / S is believed to", example: "The measure is believed to be effective.", explanation: "Cách diễn đạt khách quan, phổ biến trong văn học thuật." },
    ],
    contrasts: [
      { left: "Researchers collected the data.", right: "The data were collected.", note: "Chủ động nhấn người làm; bị động nhấn dữ liệu/quy trình." },
      { left: "They say the drug is safe.", right: "The drug is said to be safe.", note: "Reporting passive tạo giọng khách quan và gọn hơn." },
      { left: "The storm damaged the bridge.", right: "The bridge was damaged by the storm.", note: "By-phrase được giữ vì nguyên nhân có ý nghĩa." },
    ],
    mistakes: [
      { wrong: "The data was collected.", right: "The data were collected.", why: "Trong văn trang trọng, data thường được coi là số nhiều." },
      { wrong: "The policy has implemented.", right: "The policy has been implemented.", why: "Bị động hoàn thành cần has/have been + V3." },
      { wrong: "It is believed the plan effective.", right: "It is believed that the plan is effective.", why: "Sau reporting passive cần mệnh đề hoàn chỉnh hoặc cấu trúc to-infinitive." },
    ],
    academic: [
      { sentence: "The raw material is heated before it is transferred to the tank.", use: "Mô tả quy trình không cần lặp lại tác nhân." },
      { sentence: "It is widely acknowledged that education affects social mobility.", use: "Nêu nhận định chung với giọng học thuật." },
    ],
  },
  "17": {
    session: "17", unit: "07", title: "Conditionals and Wishes", titleVi: "Câu điều kiện và câu ước",
    question: "Điều kiện này là sự thật, có khả năng xảy ra, giả định hiện tại hay tiếc nuối quá khứ?",
    overview: "Các loại điều kiện tạo thành thang mức độ thực tế. Chọn thì dựa vào thời điểm và khả năng xảy ra, không chỉ học thuộc số loại.",
    points: [
      { label: "Zero / First", rule: "If + present, present / will + V", example: "If demand rises, prices will increase.", explanation: "Zero cho quy luật; First cho khả năng thực ở hiện tại/tương lai." },
      { label: "Second", rule: "If + past, would + V", example: "If cities invested more, congestion would fall.", explanation: "Giả định xa thực tế ở hiện tại hoặc tương lai." },
      { label: "Third", rule: "If + had + V3, would have + V3", example: "If they had acted earlier, the crisis would have been avoided.", explanation: "Giả định trái với sự thật trong quá khứ." },
      { label: "Wish", rule: "wish + past / past perfect / would", example: "I wish the city had planned better.", explanation: "Ước trái hiện tại, tiếc quá khứ hoặc mong người khác thay đổi." },
    ],
    contrasts: [
      { left: "If it rains, we will stay home.", right: "If it rained, we would stay home.", note: "Khả năng thực khác giả định ít có khả năng." },
      { left: "I wish I knew.", right: "I wish I had known.", note: "Không biết ở hiện tại khác tiếc vì đã không biết trong quá khứ." },
      { left: "Unless action is taken...", right: "If action is not taken...", note: "Unless tương đương if...not, không dùng thêm phủ định." },
    ],
    mistakes: [
      { wrong: "If I will have time, I will call.", right: "If I have time, I will call.", why: "Mệnh đề if loại 1 dùng hiện tại, không dùng will." },
      { wrong: "If I was you...", right: "If I were you...", why: "Were là dạng chuẩn trong giả định trang trọng." },
      { wrong: "I wish I would know the answer.", right: "I wish I knew the answer.", why: "Ước về trạng thái hiện tại dùng quá khứ đơn." },
    ],
    academic: [
      { sentence: "If governments subsidise public transport, car use may decline.", use: "Nêu hệ quả chính sách có khả năng thực." },
      { sentence: "Had the regulation been enforced, the damage could have been limited.", use: "Điều kiện quá khứ đảo ngữ, phù hợp văn trang trọng." },
    ],
  },
  "19": {
    session: "19", unit: "08", title: "Clauses", titleVi: "Mệnh đề",
    question: "Mệnh đề này có thể đứng độc lập hay đang bổ sung lý do, thời gian, mục đích, nhượng bộ hoặc kết quả?",
    overview: "Một câu dài chỉ rõ khi quan hệ giữa các mệnh đề rõ. Hãy xác định mệnh đề chính trước, rồi chọn liên từ theo đúng quan hệ logic.",
    points: [
      { label: "Main clause", rule: "S + V, nghĩa hoàn chỉnh", example: "The policy failed.", explanation: "Mang thông tin trung tâm và có thể đứng độc lập." },
      { label: "Adverb clause", rule: "because / although / when / if... + S + V", example: "Although costs rose, demand remained stable.", explanation: "Bổ sung quan hệ logic cho mệnh đề chính." },
      { label: "Noun clause", rule: "that / whether / wh-word + S + V", example: "What matters is access to education.", explanation: "Cả mệnh đề hoạt động như danh từ: chủ ngữ, tân ngữ hoặc bổ ngữ." },
      { label: "Relative clause", rule: "who / which / that / whose...", example: "The measures that were introduced proved effective.", explanation: "Bổ nghĩa cho danh từ ngay trước nó." },
    ],
    contrasts: [
      { left: "Because costs rose, demand fell.", right: "Although costs rose, demand remained stable.", note: "Because chỉ nguyên nhân; although chỉ tương phản ngoài dự đoán." },
      { left: "The fact that prices rose...", right: "The prices that rose...", note: "That-clause bổ nghĩa cho fact khác relative clause bổ nghĩa cho prices." },
      { left: "Despite the increase...", right: "Although prices increased...", note: "Despite đi với danh từ/V-ing; although đi với mệnh đề." },
    ],
    mistakes: [
      { wrong: "Although prices rose, but demand stayed high.", right: "Although prices rose, demand stayed high.", why: "Không dùng although và but trong cùng một cấu trúc." },
      { wrong: "Because of prices rose...", right: "Because prices rose... / Because of the rise in prices...", why: "Because đi với mệnh đề; because of đi với cụm danh từ." },
      { wrong: "The reason is because...", right: "The reason is that...", why: "Trong văn chuẩn, dùng the reason is that để tránh lặp nghĩa." },
    ],
    academic: [
      { sentence: "Although the initial cost is high, the long-term benefits are substantial.", use: "Tạo lập luận nhượng bộ cân bằng." },
      { sentence: "What policymakers should consider is the impact on low-income households.", use: "Noun clause đưa trọng tâm lên đầu câu." },
    ],
  },
  "21": {
    session: "21", unit: "09.1", title: "Reported Speech", titleVi: "Câu tường thuật",
    question: "Lời nói được thuật lại có cần lùi thì, đổi đại từ và thay đổi mốc thời gian hay không?",
    overview: "Tường thuật không phải chép lại từng từ. Người viết chuyển góc nhìn từ thời điểm nói ban đầu sang thời điểm thuật lại, đồng thời giữ đúng loại câu và ý nghĩa.",
    points: [
      { label: "Statements", rule: "said (that) / told + object + that", example: "She said that the results were encouraging.", explanation: "Tell cần tân ngữ; say không bắt buộc có người nghe." },
      { label: "Backshift", rule: "present → past; past → past perfect", example: "'I finished.' → He said he had finished.", explanation: "Lùi thì khi động từ tường thuật ở quá khứ và nội dung không còn được nhìn từ hiện tại." },
      { label: "Questions", rule: "asked + if/wh-word + S + V", example: "She asked whether the plan was feasible.", explanation: "Giữ trật tự câu kể, không đảo trợ động từ." },
      { label: "Commands", rule: "told/asked + object + (not) to V", example: "They advised residents not to travel.", explanation: "Mệnh lệnh và lời yêu cầu chuyển sang to-infinitive." },
    ],
    contrasts: [
      { left: "She said she was tired.", right: "She told me she was tired.", note: "Tell cần người nghe; say có thể đứng không tân ngữ." },
      { left: "He asked where I lived.", right: "He asked, 'Where do you live?'", note: "Câu hỏi gián tiếp dùng trật tự S + V." },
      { left: "The teacher said the Earth is round.", right: "The teacher said the Earth was round.", note: "Sự thật vẫn đúng có thể không lùi thì; lùi thì vẫn có thể chấp nhận theo quy tắc kể chuyện." },
    ],
    mistakes: [
      { wrong: "She told that she was busy.", right: "She said that she was busy. / She told me that...", why: "Tell cần tân ngữ chỉ người." },
      { wrong: "He asked where did I live.", right: "He asked where I lived.", why: "Câu hỏi gián tiếp không đảo trợ động từ." },
      { wrong: "She advised me don't go.", right: "She advised me not to go.", why: "Lời khuyên gián tiếp dùng object + not to V." },
    ],
    academic: [
      { sentence: "The report stated that household spending had declined.", use: "Tóm tắt nguồn nghiên cứu bằng động từ tường thuật trung tính." },
      { sentence: "Participants were asked whether they supported the proposal.", use: "Tường thuật câu hỏi khảo sát ở dạng bị động." },
    ],
  },
  "23": {
    session: "23", unit: "09.2", title: "Introductory Verbs", titleVi: "Động từ dẫn trong câu tường thuật",
    question: "Người nói đang đồng ý, phủ nhận, hứa, cảnh báo, đề nghị hay buộc tội?",
    overview: "Động từ dẫn giúp tường thuật chính xác chức năng của lời nói. Mỗi động từ đi với một mẫu ngữ pháp riêng, vì vậy cần học đồng thời nghĩa và cấu trúc.",
    points: [
      { label: "Verb + to V", rule: "agree / offer / promise / refuse + to V", example: "The company promised to cut emissions.", explanation: "Chủ thể của hành động sau thường là người đã nói." },
      { label: "Verb + object + to V", rule: "advise / warn / remind / invite + O + to V", example: "Experts warned consumers to check labels.", explanation: "Cần nêu người nhận lời khuyên/cảnh báo." },
      { label: "Verb + V-ing", rule: "admit / deny / suggest + V-ing", example: "Officials denied manipulating the figures.", explanation: "Không thêm to sau các động từ này." },
      { label: "Verb + preposition + V-ing", rule: "accuse of / apologise for / insist on", example: "They apologised for releasing the data late.", explanation: "Giới từ cố định quyết định cấu trúc sau nó." },
    ],
    contrasts: [
      { left: "He suggested leaving early.", right: "He advised us to leave early.", note: "Suggest không cần tân ngữ + to V; advise thường có người nhận lời khuyên." },
      { left: "She denied taking the money.", right: "She refused to take the money.", note: "Deny phủ nhận việc đã làm; refuse từ chối làm việc đó." },
      { left: "They warned us not to enter.", right: "They warned us about the danger.", note: "Warn + O + to V cho hành động; warn about + noun cho mối nguy." },
    ],
    mistakes: [
      { wrong: "He suggested us to wait.", right: "He suggested waiting. / He suggested that we wait.", why: "Suggest không dùng object + to V." },
      { wrong: "She accused him to lie.", right: "She accused him of lying.", why: "Accuse + object + of + V-ing." },
      { wrong: "They promised helping us.", right: "They promised to help us.", why: "Promise đi với to-infinitive." },
    ],
    academic: [
      { sentence: "The authors acknowledge that the sample was relatively small.", use: "Nêu giới hạn nghiên cứu một cách chính xác." },
      { sentence: "Critics have accused the policy of widening inequality.", use: "Tường thuật quan điểm phê phán bằng cấu trúc cố định." },
    ],
  },
  "25": {
    session: "25", unit: "10", title: "Nouns and Articles", titleVi: "Danh từ và mạo từ",
    question: "Danh từ này đếm được không, đang nói chung hay nói về một đối tượng đã xác định?",
    overview: "Mạo từ phụ thuộc vào cách người viết đóng khung danh từ trong ngữ cảnh. Trước khi chọn a/an, the hay zero article, hãy xác định số lượng, khả năng đếm và mức độ xác định.",
    points: [
      { label: "Countability", rule: "countable / uncountable", example: "Many studies provide useful information.", explanation: "Study đếm được; information không đếm được nên không có informations." },
      { label: "A / An", rule: "một đối tượng chưa xác định", example: "A survey was conducted in 2025.", explanation: "Giới thiệu lần đầu một danh từ đếm được số ít." },
      { label: "The", rule: "đã xác định / duy nhất / đã nhắc", example: "The survey included 500 participants.", explanation: "Người đọc biết khảo sát nào vì vừa được giới thiệu." },
      { label: "Zero article", rule: "danh từ số nhiều/không đếm được nói chung", example: "Education improves social mobility.", explanation: "Khái niệm chung thường không dùng mạo từ." },
    ],
    contrasts: [
      { left: "Children need support.", right: "The children in this study need support.", note: "Nói chung khác nhóm đã xác định." },
      { left: "A university", right: "An hour", note: "A/an theo âm đầu, không theo chữ cái đầu." },
      { left: "The environment", right: "Nature", note: "Một số khái niệm có cách dùng mạo từ theo quy ước; cần học trong cụm." },
    ],
    mistakes: [
      { wrong: "an useful method", right: "a useful method", why: "Useful bắt đầu bằng âm /j/, là âm phụ âm." },
      { wrong: "many informations", right: "much information / many pieces of information", why: "Information là danh từ không đếm được." },
      { wrong: "The technology changes society.", right: "Technology changes society.", why: "Technology đang được dùng như khái niệm chung." },
    ],
    academic: [
      { sentence: "A recent study examined the effects of air pollution.", use: "A giới thiệu nghiên cứu; the xác định các tác động thuộc vấn đề đã nêu." },
      { sentence: "Access to education remains unequal.", use: "Các danh từ trừu tượng nói chung thường dùng zero article." },
    ],
  },
  "27": {
    session: "27", unit: "11", title: "Causative Form", titleVi: "Cấu trúc truyền khiến",
    question: "Chủ ngữ tự làm, sắp xếp người khác làm, hay trải qua một sự việc ngoài ý muốn?",
    overview: "Cấu trúc truyền khiến tách người hưởng/ chịu kết quả khỏi người trực tiếp thực hiện. Have/get something done vì vậy rất phù hợp khi nói về dịch vụ hoặc kết quả.",
    points: [
      { label: "Have something done", rule: "have + object + V3", example: "The company had its accounts audited.", explanation: "Sắp xếp hoặc thuê người khác thực hiện." },
      { label: "Get something done", rule: "get + object + V3", example: "We need to get the system repaired.", explanation: "Gần nghĩa have nhưng thường thân mật và nhấn mạnh việc hoàn thành." },
      { label: "Have/Get someone do/to do", rule: "have + O + V; get + O + to V", example: "They got an expert to review the plan.", explanation: "Nêu trực tiếp người được khiến/thuyết phục thực hiện." },
      { label: "Unwanted event", rule: "have + object + V3", example: "She had her phone stolen.", explanation: "Cũng có thể diễn tả việc không mong muốn xảy đến với chủ ngữ." },
    ],
    contrasts: [
      { left: "I repaired my car.", right: "I had my car repaired.", note: "Tự sửa khác thuê/nhờ người sửa." },
      { left: "I had him check it.", right: "I got him to check it.", note: "Have + O + V; get + O + to V." },
      { left: "She cut her hair.", right: "She had her hair cut.", note: "Câu thứ hai là cách nói thông thường khi đi cắt tóc." },
    ],
    mistakes: [
      { wrong: "I had fixed my laptop.", right: "I had my laptop fixed.", why: "Tân ngữ phải đứng giữa have và V3 trong causative." },
      { wrong: "She got him repair it.", right: "She got him to repair it.", why: "Get + person + to V." },
      { wrong: "They had the report to edit.", right: "They had the report edited.", why: "Have + thing + V3 để nói việc được làm." },
    ],
    academic: [
      { sentence: "The researchers had the responses independently coded.", use: "Nhấn quy trình được người khác thực hiện." },
      { sentence: "The council should get the bridge inspected immediately.", use: "Đề xuất sắp xếp một dịch vụ chuyên môn." },
    ],
  },
  "29": {
    session: "29", unit: "12", title: "Adjectives, Adverbs and Comparison", titleVi: "Tính từ, trạng từ, so sánh, too/enough",
    question: "Từ đang bổ nghĩa cho danh từ, chủ ngữ, động từ hay mức độ so sánh?",
    overview: "Đúng loại từ quyết định đúng nghĩa. Tính từ mô tả người/vật; trạng từ thường mô tả cách hành động diễn ra; cấu trúc so sánh cần bảo đảm hai đối tượng cùng loại.",
    points: [
      { label: "Adjective", rule: "before noun / after linking verb", example: "The results are significant.", explanation: "Sau be, seem, look, feel, become dùng tính từ để mô tả chủ ngữ." },
      { label: "Adverb", rule: "modify verb/adjective/adverb", example: "The figure increased significantly.", explanation: "Significantly mô tả mức tăng, không mô tả figure." },
      { label: "Comparison", rule: "-er/more; -est/most; as...as", example: "Public transport is more efficient than private cars.", explanation: "Cần so sánh các thành phần tương đương." },
      { label: "Too / Enough", rule: "too + adj; adj + enough; enough + noun", example: "The sample was too small to be reliable.", explanation: "Too hàm ý vượt mức gây vấn đề; enough là đủ cho mục đích." },
    ],
    contrasts: [
      { left: "The food smells delicious.", right: "She smells the food carefully.", note: "Linking verb nhận adjective; action verb nhận adverb." },
      { left: "too expensive", right: "very expensive", note: "Too hàm ý đắt đến mức không phù hợp; very chỉ nhấn mạnh." },
      { left: "the salary of a teacher", right: "that of a banker", note: "Dùng that/those để tạo phép so sánh tương đương." },
    ],
    mistakes: [
      { wrong: "The number rose sharp.", right: "The number rose sharply.", why: "Bổ nghĩa cho động từ rose cần trạng từ." },
      { wrong: "more easier", right: "easier", why: "Không dùng hai dấu hiệu so sánh hơn cùng lúc." },
      { wrong: "The salary is lower than a banker.", right: "The salary is lower than a banker's.", why: "Phải so sánh salary với salary." },
    ],
    academic: [
      { sentence: "The second method produced significantly more accurate results.", use: "Trạng từ mức độ bổ nghĩa cho so sánh." },
      { sentence: "The sample was not large enough to represent the population.", use: "Enough + to V nêu giới hạn phương pháp." },
    ],
  },
  "31": {
    session: "31", unit: "13", title: "Reference and Quantity", titleVi: "Từ chỉ định, đại từ, sở hữu và lượng từ",
    question: "Từ này đang thay cho danh từ nào và lượng được nói tới phù hợp với danh từ đếm được hay không đếm được?",
    overview: "Đại từ và từ chỉ định giúp văn bản liên kết, nhưng phải có đối tượng tham chiếu rõ. Lượng từ đồng thời phải khớp với loại danh từ và sắc thái khẳng định/phủ định.",
    points: [
      { label: "Demonstratives", rule: "this/these; that/those", example: "These findings support the earlier theory.", explanation: "Chỉ số lượng và khoảng cách; trong học thuật còn dùng để nối với ý vừa nêu." },
      { label: "Pronouns", rule: "subject/object/reflexive", example: "The participants completed the survey themselves.", explanation: "Đại từ phản thân nhấn chính chủ thể thực hiện." },
      { label: "Possession", rule: "my/mine; John's; of-phrase", example: "The study's findings were published.", explanation: "Sở hữu cách dùng được với tổ chức, thời gian và danh từ chỉ người." },
      { label: "Quantifiers", rule: "many/few; much/little; some/any", example: "Few studies have examined this issue.", explanation: "Few mang nghĩa gần như không đủ; a few mang nghĩa vẫn có một số." },
    ],
    contrasts: [
      { left: "few opportunities", right: "a few opportunities", note: "Gần như không có khác vẫn có một số." },
      { left: "little evidence", right: "a little evidence", note: "Không đủ bằng chứng khác có một ít bằng chứng." },
      { left: "This suggests...", right: "These suggest...", note: "This có thể thay cả ý trước; these thay danh từ số nhiều rõ ràng." },
    ],
    mistakes: [
      { wrong: "much students", right: "many students", why: "Students là danh từ đếm được số nhiều." },
      { wrong: "each students", right: "each student", why: "Each đi với danh từ số ít." },
      { wrong: "The company changed it's policy.", right: "The company changed its policy.", why: "Its là tính từ sở hữu; it's = it is." },
    ],
    academic: [
      { sentence: "Few studies have addressed this issue in rural areas.", use: "Few nhấn khoảng trống nghiên cứu." },
      { sentence: "These results indicate that further research is needed.", use: "These results liên kết rõ với dữ liệu vừa trình bày." },
    ],
  },
  "33": {
    session: "33", unit: "14", title: "Questions", titleVi: "Câu hỏi, câu hỏi đuôi và câu hỏi gián tiếp",
    question: "Đây là câu hỏi trực tiếp, xác nhận thông tin hay cách hỏi lịch sự gián tiếp?",
    overview: "Ba loại câu hỏi khác nhau ở trật tự từ và mục đích giao tiếp. Câu hỏi gián tiếp đặc biệt quan trọng vì phần sau cụm dẫn trở lại trật tự câu kể.",
    points: [
      { label: "Direct questions", rule: "auxiliary + S + V?", example: "Why did the figure decline?", explanation: "Đưa trợ động từ hoặc be lên trước chủ ngữ." },
      { label: "Subject questions", rule: "Who/What + V?", example: "What caused the decline?", explanation: "Từ hỏi chính là chủ ngữ nên không dùng do/does/did." },
      { label: "Question tags", rule: "statement, opposite auxiliary + pronoun?", example: "The policy worked, didn't it?", explanation: "Mệnh đề khẳng định thường đi với đuôi phủ định và ngược lại." },
      { label: "Indirect questions", rule: "intro + wh/if + S + V", example: "Could you explain why the figure declined?", explanation: "Sau từ hỏi dùng trật tự câu kể." },
    ],
    contrasts: [
      { left: "Who did you invite?", right: "Who invited you?", note: "Câu đầu hỏi tân ngữ; câu sau hỏi chủ ngữ." },
      { left: "Where is he?", right: "Do you know where he is?", note: "Câu hỏi gián tiếp không đảo is lên trước chủ ngữ." },
      { left: "Open the door, will you?", right: "Let's begin, shall we?", note: "Mệnh lệnh và let's có dạng đuôi thường dùng riêng." },
    ],
    mistakes: [
      { wrong: "Do you know where is he?", right: "Do you know where he is?", why: "Mệnh đề hỏi gián tiếp dùng S + V." },
      { wrong: "Who did cause the problem?", right: "Who caused the problem?", why: "Who làm chủ ngữ nên không cần did." },
      { wrong: "She isn't late, isn't she?", right: "She isn't late, is she?", why: "Question tag thường mang cực đối lập với mệnh đề chính." },
    ],
    academic: [
      { sentence: "A key question is whether the benefits outweigh the costs.", use: "Whether-clause tạo câu hỏi nghiên cứu gián tiếp." },
      { sentence: "This raises the question of how resources should be allocated.", use: "Cách đặt vấn đề trang trọng trong bài luận." },
    ],
  },
  "35": {
    session: "35", unit: "15", title: "Advanced Conditionals", titleVi: "Điều kiện hỗn hợp, đảo ngữ và cấu trúc thay thế",
    question: "Điều kiện và kết quả thuộc cùng hay khác thời điểm, và câu có cần sắc thái trang trọng hơn không?",
    overview: "Điều kiện nâng cao cho phép kết nối nguyên nhân quá khứ với kết quả hiện tại và ngược lại. Đảo ngữ bỏ if nhưng không thay đổi quan hệ thời gian.",
    points: [
      { label: "Past → present", rule: "If + had V3, would + V", example: "If the city had planned better, traffic would be lighter now.", explanation: "Nguyên nhân trái quá khứ tạo kết quả trái hiện tại." },
      { label: "Present → past", rule: "If + past, would have + V3", example: "If he were more careful, he would not have made that error.", explanation: "Đặc điểm hiện tại giải thích một kết quả quá khứ." },
      { label: "Inversion", rule: "Had / Were / Should + S...", example: "Had the policy failed, costs would have risen.", explanation: "Bỏ if và đảo trợ động từ lên đầu; thường trang trọng." },
      { label: "Alternatives", rule: "unless / provided / otherwise / but for", example: "But for public funding, the project would have collapsed.", explanation: "Thay mệnh đề if bằng cụm điều kiện cô đọng." },
    ],
    contrasts: [
      { left: "If I had known...", right: "Had I known...", note: "Nghĩa tương đương; đảo ngữ trang trọng hơn." },
      { left: "unless action is taken", right: "if no action is taken", note: "Unless đã chứa nghĩa phủ định." },
      { left: "provided that", right: "otherwise", note: "Provided nêu điều kiện đủ; otherwise nêu hậu quả nếu điều kiện không được đáp ứng." },
    ],
    mistakes: [
      { wrong: "Had they acted, they would avoid the crisis.", right: "Had they acted, they would have avoided the crisis.", why: "Cả điều kiện và kết quả đều trái quá khứ." },
      { wrong: "Unless they don't act...", right: "Unless they act...", why: "Không thêm not sau unless." },
      { wrong: "Were the policy fail...", right: "Were the policy to fail...", why: "Đảo ngữ giả định tương lai dùng were + S + to V." },
    ],
    academic: [
      { sentence: "Had stricter regulations been introduced, emissions might have fallen sooner.", use: "Đánh giá phản thực trong văn phân tích." },
      { sentence: "Provided that funding is maintained, the programme should remain viable.", use: "Nêu điều kiện cần cho một dự báo thận trọng." },
    ],
  },
  "37": {
    session: "37", unit: "16", title: "Subject–Verb Agreement", titleVi: "Sự hòa hợp chủ ngữ – động từ",
    question: "Chủ ngữ ngữ pháp thực sự là từ nào, số ít hay số nhiều, và có cụm chen giữa gây nhiễu không?",
    overview: "Động từ hòa hợp với chủ ngữ chính chứ không nhất thiết với danh từ đứng gần nhất. Hãy bỏ qua cụm chen giữa rồi xác định hạt nhân của cụm danh từ.",
    points: [
      { label: "Nearest subject", rule: "either...or / neither...nor", example: "Neither the teachers nor the principal is available.", explanation: "Động từ thường hòa hợp với chủ ngữ gần nhất trong cấu trúc tương liên." },
      { label: "Inserted phrases", rule: "as well as / together with", example: "The manager, together with her staff, is attending.", explanation: "Cụm chen giữa không làm đổi số của chủ ngữ chính." },
      { label: "Indefinite subjects", rule: "each/every/everyone + singular verb", example: "Each participant receives a code.", explanation: "Nhấn từng cá thể nên động từ số ít." },
      { label: "Collective and data nouns", rule: "meaning decides", example: "The number of applicants is rising.", explanation: "The number is; a number of applicants are." },
    ],
    contrasts: [
      { left: "The number of cases is rising.", right: "A number of cases are unresolved.", note: "The number là một con số; a number of = nhiều." },
      { left: "Ten kilometres is a long distance.", right: "Ten students are absent.", note: "Khoảng đo như một đơn vị dùng số ít; người đếm được dùng số nhiều." },
      { left: "Neither A nor B is...", right: "Neither A nor the students are...", note: "Động từ theo thành phần gần nhất." },
    ],
    mistakes: [
      { wrong: "The list of items are long.", right: "The list of items is long.", why: "Chủ ngữ chính là list." },
      { wrong: "Each of the students have a code.", right: "Each of the students has a code.", why: "Each là hạt nhân số ít." },
      { wrong: "There is many reasons.", right: "There are many reasons.", why: "Trong there be, động từ hòa hợp với danh từ theo sau." },
    ],
    academic: [
      { sentence: "The proportion of households using solar energy has increased.", use: "Chủ ngữ proportion số ít, dù households số nhiều đứng gần động từ hơn." },
      { sentence: "A range of factors contribute to the problem.", use: "Trong cách dùng phổ biến, trọng tâm là nhiều factors; cần giữ nhất quán theo chuẩn chọn dùng." },
    ],
  },
  "39": {
    session: "39", unit: "17", title: "Subjunctive Mood", titleVi: "Thức giả định",
    question: "Câu đang nói về thực tế hay một điều được yêu cầu, giả định, mong muốn hoặc đáng lẽ phải xảy ra?",
    overview: "Thức giả định giữ động từ ở dạng đặc biệt để tách ý tưởng khỏi thực tế. Trong tiếng Anh trang trọng, dạng nguyên mẫu sau động từ yêu cầu là điểm dễ bỏ sót nhất.",
    points: [
      { label: "Mandative subjunctive", rule: "suggest/insist + that + S + V", example: "Experts recommend that the law be revised.", explanation: "Dùng bare infinitive cho mọi chủ ngữ; be vẫn là be." },
      { label: "It is essential that", rule: "adjective + that + S + V", example: "It is vital that every applicant submit the form.", explanation: "Diễn tả sự cần thiết, yêu cầu hoặc khuyến nghị." },
      { label: "It's time", rule: "It's time + S + past", example: "It is time governments acted.", explanation: "Hình thức quá khứ nhưng nghĩa là việc nên làm ngay hiện tại." },
      { label: "As if / would rather", rule: "past / past perfect", example: "He talks as if he knew everything.", explanation: "Dùng thì lùi để thể hiện điều không thật hoặc trái mong muốn." },
    ],
    contrasts: [
      { left: "They suggested that he leave.", right: "They suggested that he should leave.", note: "Cả hai đúng; bare subjunctive trang trọng và gọn hơn." },
      { left: "It is time to leave.", right: "It is time we left.", note: "Câu thứ hai nhấn việc đã đến lúc, đôi khi hơi muộn." },
      { left: "He looks as if he is tired.", right: "He talks as if he knew everything.", note: "Dùng thì thực khi có vẻ thật; thì lùi khi giả định không thật." },
    ],
    mistakes: [
      { wrong: "They demanded that he leaves.", right: "They demanded that he leave.", why: "Mandative subjunctive dùng bare infinitive." },
      { wrong: "It is essential that she is present.", right: "It is essential that she be present.", why: "Trong văn trang trọng dùng be giả định." },
      { wrong: "I'd rather you don't go.", right: "I'd rather you didn't go.", why: "Would rather + subject dùng quá khứ cho mong muốn hiện tại." },
    ],
    academic: [
      { sentence: "It is imperative that policymakers address regional inequality.", use: "Đưa ra yêu cầu mạnh với giọng trang trọng." },
      { sentence: "The committee recommended that further trials be conducted.", use: "Subjunctive kết hợp bị động trong báo cáo nghiên cứu." },
    ],
  },
  "41": {
    session: "41", unit: "18", title: "Advanced Relative Clauses", titleVi: "Mệnh đề quan hệ nâng cao",
    question: "Thông tin này dùng để xác định danh từ, bổ sung thêm, hay được đưa vào cấu trúc nhấn mạnh?",
    overview: "Mệnh đề quan hệ nâng cao giúp nén thông tin và kiểm soát trọng tâm câu. Dấu phẩy, giới từ và dạng rút gọn đều có thể làm thay đổi nghĩa.",
    points: [
      { label: "Defining vs non-defining", rule: "no commas / commas", example: "Students who revise regularly improve faster.", explanation: "Defining xác định nhóm; non-defining chỉ thêm thông tin." },
      { label: "Preposition + whom/which", rule: "formal relative", example: "The method on which the model is based is reliable.", explanation: "Giới từ đứng trước whom/which trong văn trang trọng." },
      { label: "Reduced clauses", rule: "V-ing / V3 / to V", example: "The data collected in May were incomplete.", explanation: "Rút gọn khi chủ thể và quan hệ chủ động/bị động rõ." },
      { label: "Cleft sentences", rule: "It is/was X that/who...", example: "It was poor planning that caused the delay.", explanation: "Đưa thành phần cần nhấn vào sau be." },
    ],
    contrasts: [
      { left: "My brother who lives in Hue...", right: "My brother, who lives in Hue,...", note: "Không dấu phẩy ngụ ý có nhiều anh/em; có dấu phẩy chỉ thêm thông tin về một người đã xác định." },
      { left: "the people who were affected", right: "the people affected", note: "Mệnh đề bị động có thể rút gọn thành V3." },
      { left: "This policy caused the change.", right: "It was this policy that caused the change.", note: "Cleft sentence nhấn mạnh nguyên nhân." },
    ],
    mistakes: [
      { wrong: "The data, that were collected...", right: "The data, which were collected...", why: "Không dùng that trong non-defining clause." },
      { wrong: "The person which led the team...", right: "The person who led the team...", why: "Dùng who/that cho người." },
      { wrong: "The policy introducing last year...", right: "The policy introduced last year...", why: "Policy chịu hành động introduce nên dùng V3." },
    ],
    academic: [
      { sentence: "The regions in which investment was highest experienced faster growth.", use: "Giới từ + which tạo quan hệ trang trọng và chính xác." },
      { sentence: "It is access to quality education that most strongly predicts mobility.", use: "Câu chẻ nhấn biến số trung tâm." },
    ],
  },
  "43": {
    session: "43", unit: "19", title: "Inversion", titleVi: "Đảo ngữ",
    question: "Cụm phủ định hoặc hạn định nào được đưa lên đầu câu, và trợ động từ cần đảo theo thì nào?",
    overview: "Đảo ngữ tạo nhấn mạnh và sắc thái trang trọng. Sau khi đưa cụm phủ định lên đầu, phần còn lại có trật tự giống câu hỏi nhưng câu vẫn là câu khẳng định.",
    points: [
      { label: "Negative adverbials", rule: "Never/Rarely/Seldom + aux + S + V", example: "Rarely do citizens receive such clear information.", explanation: "Thêm trợ động từ phù hợp khi câu gốc không có auxiliary." },
      { label: "No sooner / Hardly", rule: "had + S + V3 + than/when", example: "No sooner had the law passed than protests began.", explanation: "Hai sự việc quá khứ xảy ra sát nhau; liên từ phải đi đúng cặp." },
      { label: "Only + adverbial", rule: "Only after/when/by... + aux + S + V", example: "Only after the review did the problem become clear.", explanation: "Đảo ở mệnh đề chính, không đảo trong mệnh đề sau only." },
      { label: "Not only", rule: "Not only + aux + S + V, but...", example: "Not only did costs fall, but quality also improved.", explanation: "Nhấn mạnh hai kết quả cùng đúng." },
    ],
    contrasts: [
      { left: "I had never seen this.", right: "Never had I seen this.", note: "Nghĩa cơ bản giống nhau; đảo ngữ nhấn mạnh và trang trọng." },
      { left: "Only he understood.", right: "Only then did he understand.", note: "Only + chủ ngữ không đảo; only + trạng ngữ đầu câu mới đảo." },
      { left: "Hardly...when", right: "No sooner...than", note: "Hai cặp cố định không trộn liên từ." },
    ],
    mistakes: [
      { wrong: "Never I have seen...", right: "Never have I seen...", why: "Đảo trợ động từ lên trước chủ ngữ." },
      { wrong: "No sooner had he arrived when...", right: "No sooner had he arrived than...", why: "No sooner đi với than." },
      { wrong: "Only after he arrived did he understood.", right: "Only after he arrived did he understand.", why: "Sau did dùng động từ nguyên mẫu." },
    ],
    academic: [
      { sentence: "Only by addressing structural inequality can lasting progress be achieved.", use: "Nhấn mạnh điều kiện cần trong kết luận học thuật." },
      { sentence: "Not only does the policy reduce costs, but it also improves access.", use: "Nhấn đồng thời hai lợi ích." },
    ],
  },
  "45": {
    session: "45", unit: "20", title: "Comparison and Participles", titleVi: "So sánh và phân từ",
    question: "Phép so sánh đã tương đương chưa, và phân từ đang diễn tả nguyên nhân gây cảm xúc hay trạng thái của người/vật?",
    overview: "Unit cuối kết hợp hai điểm dễ sai trong văn học thuật: so sánh phải cùng loại và phân từ phải đúng quan hệ chủ động–bị động hoặc gây ra–cảm nhận.",
    points: [
      { label: "Emphatic comparison", rule: "far/much + comparative; by far + superlative", example: "This method is far more reliable.", explanation: "Dùng từ nhấn mức chênh lệch, không dùng very trước comparative." },
      { label: "Double comparison", rule: "more and more / the more..., the more...", example: "The more people drive, the worse congestion becomes.", explanation: "Diễn tả sự thay đổi song hành." },
      { label: "V-ing adjectives", rule: "gây ra cảm xúc/đặc điểm chủ động", example: "The findings are surprising.", explanation: "Findings tạo ra cảm giác ngạc nhiên." },
      { label: "V3/ed adjectives", rule: "cảm thấy / chịu tác động", example: "Researchers were surprised by the findings.", explanation: "Researchers nhận tác động của cảm xúc." },
    ],
    contrasts: [
      { left: "The result is confusing.", right: "The students are confused.", note: "V-ing gây cảm xúc; V-ed cảm nhận cảm xúc." },
      { left: "much better", right: "very good", note: "Much nhấn comparative; very nhấn adjective thường." },
      { left: "the population of A", right: "that of B", note: "That thay danh từ số ít để so sánh tương đương." },
    ],
    mistakes: [
      { wrong: "The lecture was bored.", right: "The lecture was boring.", why: "Bài giảng gây chán nên dùng V-ing." },
      { wrong: "This is very better.", right: "This is much better.", why: "Dùng much/far để nhấn comparative." },
      { wrong: "The population of A is higher than B.", right: "The population of A is higher than that of B.", why: "Phải so sánh population với population." },
    ],
    academic: [
      { sentence: "The higher the level of education, the lower the unemployment rate.", use: "So sánh kép diễn tả mối tương quan." },
      { sentence: "The most striking feature is the widening gap between the two groups.", use: "Superlative và V-ing adjective dùng trong Overview Task 1." },
    ],
  },
};
