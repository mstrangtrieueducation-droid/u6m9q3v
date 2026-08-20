export type QuizQuestion = {
  number: number;
  prompt: string;
  answer: string;
  distractors: string[];
  explanation: string;
};

export type QuizExercise = {
  title: string;
  help: string;
  passageTitle?: string;
  passage?: string[];
  questions: QuizQuestion[];
};

const meaningByQuestion: Record<number, string> = {
  1: "Hiện tại, hội đang có hơn 20 chú chó và 35 chú mèo rất cần một mái ấm",
  2: "Chúng tôi đang tìm những người yêu động vật",
  3: "Chúng tôi cần những người thực sự yêu động vật",
  4: "Chúng tôi cần những người biết chăm sóc thú cưng chu đáo",
  5: "Bạn có muốn nhận nuôi một trong những con vật đáng yêu của chúng tôi không?",
  6: "Cuối tuần này chúng tôi sẽ tổ chức một ngày hội nhận nuôi",
  7: "Việc nhận nuôi hoàn toàn miễn phí",
  8: "Hiện giờ con đang trong giờ nghỉ trưa",
  9: "Bình thường con không gọi cho mẹ từ chỗ làm",
  10: "Cuối tuần này Sarah và con sẽ về nhà",
  11: "Ngay lúc này con đang đặt vé tàu trên mạng",
  12: "Theo lịch, tàu rời London lúc 5 giờ 15",
  13: "Theo lịch, tàu đến Liverpool lúc 7 giờ 45",
  14: "Xúc xích có vị rất ngon",
  15: "Bạn có đang vui và tận hưởng bữa tiệc này không?",
  16: "Bạn đang nghĩ về chuyện gì vậy?",
  17: "Anh ấy có nuôi một con mèo Xiêm",
  18: "Những bông hoa này có mùi rất thơm",
  19: "Tôi không biết cô ấy cất chìa khóa ở đâu",
  20: "Những tấm ga lụa này sờ vào rất mềm và mịn",
  21: "Tại sao bạn lại đang ngửi hộp sữa vậy?",
  22: "Anna là người Ý; cô ấy đến từ nước Ý",
  23: "Chiếc váy đó trông rất đẹp khi bạn mặc",
  24: "Nếu bạn không còn đang xem cuốn truyện đó thì tôi muốn xem",
  25: "Bác sĩ đang cân em bé",
  26: "Dạo này Mary đang cư xử rất nghịch ngợm",
  27: "Tại sao bạn đang tự cân mình?",
  28: "Tôi muốn biết cân nặng của mình có phù hợp với chiều cao không",
  29: "Em trai bạn rất đáng yêu",
  30: "Nhưng riêng hôm nay cậu bé đang cư xử rất nghịch",
  31: "Tôi thấy bạn đang sở hữu một chiếc điện thoại mới",
  32: "Nhưng hiện giờ tôi đang gặp nhiều vấn đề với chiếc điện thoại ấy",
  33: "Tại sao bạn đang nếm món súp khi nó chưa nấu xong?",
  34: "Tôi nếm thử để xem món súp có vị đủ ngọt cho trẻ em không",
  35: "Mike quê ở đâu?",
  36: "Hiện Mike đang ở Glasgow nhưng ngày mai anh ấy sẽ quay lại theo kế hoạch",
  37: "Tôi hiểu rằng Charlotte đang bị đau răng",
  38: "Chiều nay Charlotte sẽ gặp nha sĩ theo lịch hẹn",
  39: "Ben đã đi nha sĩ và lúc này vẫn chưa quay về",
  40: "Tôi đã đến Pháp hai lần và đều đã trở về",
  41: "Tôi đã chơi bóng bầu dục suốt hai tiếng nên quần áo bây giờ rất bẩn",
  42: "Lucy đã làm việc chăm chỉ từ 9 giờ 30 đến giờ nên trông rất mệt",
  43: "Bố mẹ đã đi xem phim với bạn và hiện chưa về nhà",
  44: "Cho đến bây giờ cô ấy vẫn chưa gặp Cathy",
  45: "Tôi không gặp anh ấy kể từ tuần trước",
  46: "Bạn đã làm việc ở đây được bao lâu rồi?",
  47: "Cô ấy thường xuyên nấu những món ăn lạ",
  48: "Pablo đã ở Lisbon được bốn năm",
  49: "Trong vài tháng vừa qua tôi không tập thể dục",
  50: "Vì không tập luyện nên đến bây giờ tôi đã tăng cân",
  51: "Tôi đã đưa ra quyết định rằng mình thật sự muốn giảm cân",
  52: "Tôi đã đăng ký và hiện là thành viên của phòng tập mới",
  53: "Tôi đã đến phòng tập đó vài lần rồi",
  54: "Tôi đã làm quen được một số người bạn mới ở đó",
  55: "Hai tuần vừa qua Rebecca và tôi liên tục học rất chăm chỉ",
  56: "Bạn đã cân nhắc xem hè này mình muốn đi đâu chưa?",
  57: "Khách sạn nơi chúng tôi đang ở trong chuyến đi này thật tuyệt",
  58: "Hiện chúng tôi đang có một kỳ nghỉ rất vui",
  59: "Hôm nay tất cả chúng tôi đều đang ở bãi biển",
  60: "Ngay lúc này Carla và Daniela đang xây lâu đài cát",
  61: "Bố mẹ đã chơi bóng chuyền bãi biển liên tục hơn một giờ",
  62: "Giovanni vừa đi lặn với các bạn và hiện chưa quay lại",
  63: "Ngày nào họ cũng đi lặn",
  64: "Tính đến lúc này tôi đã thử môn lướt ván buồm",
  65: "Cho đến giờ chúng tôi vẫn chưa tham quan được nhiều nơi",
  66: "Ngày mai chúng tôi sẽ đi tham quan quanh đảo theo kế hoạch",
};

const q = (number: number, prompt: string, answer: string, distractors: string[], explanation: string): QuizQuestion => ({
  number,
  prompt,
  answer,
  distractors,
  explanation: `Câu này muốn nói: “${meaningByQuestion[number]}”.\n${explanation}`,
});

export const exercises: QuizExercise[] = [
    {
      title: 'PHẦN 1 | PRESENT SIMPLE & PRESENT CONTINUOUS',
      help: 'Complete the advertisement with the verbs in brackets. Use the present simple or the present continuous. Example 0: need.',
      passageTitle: 'Adopt an Animal TODAY',
      passage: [
        'The Animal Adoption Society 0. __need__ (need) your help! At the moment, we 1. _________ (have) more than 20 dogs and 35 cats that desperately need a home.',
        'We 2. _________ (look) for people who 3. _________ (love) animals and who 4. _________ (take) good care of pets.',
        '5. _________________ (you/want) to adopt one of our adorable animals? We 6. _________ (have) an open day this weekend. Please come! Adoption 7. _________ (be) completely free!',
      ],
      questions: [
        q(1, 'At the moment, we ___ more than 20 dogs and 35 cats that desperately need a home. (have)', 'have', ['are having', 'has', 'is having'], 'Have diễn tả sự sở hữu nên dùng Present Simple. Cụm “at the moment” không làm một động từ trạng thái chuyển sang tiếp diễn.'),
        q(2, 'We ___ for people who love animals. (look)', 'are looking', ['look', 'looks', 'is looking'], 'Việc tìm người đang diễn ra trong giai đoạn hiện tại, vì vậy “look” được dùng ở dạng “are looking”.'),
        q(3, 'We are looking for people who ___ animals. (love)', 'love', ['are loving', 'loves', 'is loving'], 'Love là động từ trạng thái chỉ sở thích/tình cảm; trong nghĩa này không dùng ở thì tiếp diễn.'),
        q(4, 'We are looking for people who ___ good care of pets. (take)', 'take', ['are taking', 'takes', 'is taking'], 'Mệnh đề mô tả phẩm chất hoặc thói quen chung của “people”, nên dùng Present Simple.'),
        q(5, '___ to adopt one of our adorable animals? (you/want)', 'Do you want', ['Are you wanting', 'Does you want', 'You want'], 'Want là động từ trạng thái. Câu hỏi Present Simple với chủ ngữ you dùng Do + you + want.'),
        q(6, 'We ___ an open day this weekend. (have)', 'are having', ['have', 'has', 'is having'], 'Sự kiện đã được sắp xếp cho cuối tuần này là một kế hoạch tương lai gần, nên dùng Present Continuous.'),
        q(7, 'Adoption ___ completely free! (be)', 'is', ['are', 'is being', 'be'], 'Chủ ngữ số ít “Adoption” nói về một sự thật của chương trình, nên dùng is ở Present Simple.')
      ]
    },
    {
      title: 'PHẦN 2 | DIALOGUE: ROUTINE, NOW & TIMETABLE',
      help: 'Fill in with the present simple or the present continuous. Example 0: Are you calling?',
      passageTitle: 'Claire calls her mum',
      passage: [
        'Claire: Hi, Mum. It’s me!',
        'Mum: Claire! What a lovely surprise! 0. __Are you calling__ (you/call) from work?',
        'Claire: Yes. I 8. ____________ (be) on my lunch break at the moment.',
        'Mum: Is everything all right? You 9. ___________________ (usually/not call) me from work.',
        'Claire: Everything’s fine! I just want you to know that Sarah and I 10. _________________ (come) home this weekend. I 11. ________________ (book) our train tickets online right now.',
        'Mum: Wonderful!',
        'Claire: Our train 12. ______________ (leave) London at 5:15 pm and 13. _____________ (arrive) in Liverpool at 7:45 pm.',
        'Mum: Great. See you soon then!',
      ],
      questions: [
        q(8, 'Claire: Yes. I ___ on my lunch break at the moment. (be)', 'am', ['am being', 'is', 'are'], 'Be mô tả trạng thái hiện tại của Claire; với I dùng am.'),
        q(9, 'Mum: You ___ me from work. (usually/not call)', "don't usually call", ["aren't usually calling", "doesn't usually call", "not usually call"], 'Usually diễn tả thói quen. Phủ định Present Simple với you là do not/don’t + usually + call.'),
        q(10, 'Claire: Sarah and I ___ home this weekend. (come)', 'are coming', ['come', 'comes', 'is coming'], 'Đây là kế hoạch đã sắp xếp cho cuối tuần nên dùng Present Continuous.'),
        q(11, 'I ___ our train tickets online right now. (book)', 'am booking', ['book', 'books', 'are booking'], 'Right now là dấu hiệu hành động đang diễn ra; với I dùng am booking.'),
        q(12, 'Our train ___ London at 5:15 pm. (leave)', 'leaves', ['is leaving', 'leave', 'leaving'], 'Giờ tàu là lịch trình cố định, nên dùng Present Simple dù nói về tương lai.'),
        q(13, 'The train ___ in Liverpool at 7:45 pm. (arrive)', 'arrives', ['is arriving', 'arrive', 'arriving'], 'Thời gian đến thuộc lịch trình chính thức; chủ ngữ số ít train dùng arrives.')
      ]
    },
    {
      title: 'PHẦN 3 | STATIVE & DYNAMIC VERBS',
      help: 'Choose the correct item. Pay attention to verbs that change meaning in the continuous form.',
      questions: [
        q(14, 'The sausages ___ delicious.', 'taste', ['are tasting'], 'Taste là linking verb mô tả hương vị của món ăn, không phải hành động nếm có chủ ý.'),
        q(15, '___ the party?', 'Are you enjoying', ['Do you enjoy'], 'Câu hỏi hỏi cảm nhận tại bữa tiệc đang diễn ra, nên dùng Present Continuous.'),
        q(16, 'You haven’t said a word all morning. What ___ about?', 'are you thinking', ['do you think'], 'Think about là quá trình suy nghĩ đang diễn ra; ngữ cảnh “all morning” hướng đến hành động tạm thời.'),
        q(17, 'He ___ a Siamese cat.', 'has', ['is having'], 'Have mang nghĩa sở hữu nên dùng Present Simple.'),
        q(18, 'These flowers ___ nice.', 'smell', ['are smelling'], 'Smell là linking verb mô tả mùi của hoa, không phải hành động chủ động ngửi.'),
        q(19, 'I ___ where she keeps the keys.', "don't know", ['am not knowing'], 'Know là động từ trạng thái chỉ nhận thức; không dùng ở thì tiếp diễn trong nghĩa này.'),
        q(20, 'These silk sheets ___ lovely and smooth.', 'feel', ['are feeling'], 'Feel là linking verb mô tả đặc tính bề mặt của sheets, nên dùng Present Simple.'),
        q(21, 'Why ___ the milk? Do you think it has gone off?', 'are you smelling', ['do you smell'], 'Ở đây smell là hành động chủ động đưa sữa lên ngửi ngay lúc nói, nên dùng Present Continuous.'),
        q(22, 'Anna is Italian. She ___ from Italy.', 'comes', ['is coming'], 'Come from diễn tả nguồn gốc, là một sự thật ổn định nên dùng Present Simple.'),
        q(23, 'That dress ___ nice on you.', 'looks', ['is looking'], 'Look là linking verb mô tả vẻ ngoài của chiếc váy, nên dùng Present Simple.'),
        q(24, 'If you ___ at that comic book, I’d like to see it.', "aren't looking", ["don't look"], 'Câu nói đề cập việc người kia có đang xem cuốn truyện tại thời điểm hiện tại hay không, nên dùng Present Continuous.'),
        q(25, 'The doctor ___ the baby.', 'is weighing', ['weighs'], 'Weigh ở đây là hành động cân em bé có chủ ý, nên dùng Present Continuous.'),
        q(26, 'Mary ___ very naughty these days.', 'is being', ['is'], 'Be + being nhấn mạnh cách cư xử tạm thời, khác với tính cách ổn định của Mary.')
      ]
    },
    {
      title: 'PHẦN 4 | VERBS WITH TWO MEANINGS',
      help: 'Put the verbs in brackets into the present simple or the present continuous.',
      passageTitle: 'Six complete mini-dialogues',
      passage: [
        'A: Why 27. ____________ (you/weigh) yourself?\nB: I want to see if I 28. ____________ (weigh) enough for my height.',
        'A: Your baby brother 29. ____________ (be) adorable!\nB: Yes, but today he 30. ____________ (be) really naughty. He keeps drawing on the wall.',
        'A: I see you 31. ____________ (have) a new mobile phone.\nB: Yes, but I 32. ____________ (have) problems with it at the moment.',
        'A: Why 33. ____________ (you/taste) the soup? It’s not ready yet.\nB: To see if it 34. ____________ (taste) sweet enough for the children.',
        'A: Do you know where Mike 35. ____________ (come) from?\nB: He’s from Glasgow. Actually, he’s there at the moment but he 36. ____________ (come) back tomorrow.',
        'A: I 37. ____________ (see) Charlotte has a toothache.\nB: Yes. She’s in a lot of pain. She 38. ____________ (see) her dentist this afternoon, though.',
      ],
      questions: [
        q(27, 'A: Why 27. ___ yourself? (you/weigh)\nB: I want to see if I 28. ___ enough for my height. (weigh)', 'are you weighing', ['do you weigh', 'are you weigh', 'do you weighing'], 'Weigh yourself là hành động cân có chủ ý đang diễn ra, nên dùng Present Continuous.'),
        q(28, 'A: Why 27. ___ yourself? (you/weigh)\nB: I want to see if I 28. ___ enough for my height. (weigh)', 'weigh', ['am weighing', 'weighs', 'am weigh'], 'Weigh ở đây chỉ số cân nặng của cơ thể, là trạng thái/đặc điểm nên dùng Present Simple.'),
        q(29, 'A: Your baby brother 29. ___ adorable! (be)\nB: Yes, but today he 30. ___ really naughty. He keeps drawing on the wall. (be)', 'is', ['is being', 'are', 'be'], 'Adorable mô tả đặc điểm của em bé; với chủ ngữ số ít dùng is.'),
        q(30, 'A: Your baby brother 29. ___ adorable! (be)\nB: Yes, but today he 30. ___ really naughty. He keeps drawing on the wall. (be)', 'is being', ['is', 'are being', 'be'], 'Today cho thấy hành vi nghịch ngợm chỉ mang tính tạm thời; dùng is being.'),
        q(31, 'A: I see you 31. ___ a new mobile phone. (have)\nB: Yes, but I 32. ___ problems with it at the moment. (have)', 'have', ['are having', 'has', 'having'], 'Have mang nghĩa sở hữu điện thoại nên dùng Present Simple.'),
        q(32, 'A: I see you 31. ___ a new mobile phone. (have)\nB: Yes, but I 32. ___ problems with it at the moment. (have)', 'am having', ['have', 'has', 'am have'], 'Have problems diễn tả trải nghiệm/vấn đề tạm thời đang xảy ra; dùng Present Continuous.'),
        q(33, 'A: Why 33. ___ the soup? It’s not ready yet. (you/taste)\nB: To see if it 34. ___ sweet enough for the children. (taste)', 'are you tasting', ['do you taste', 'are you taste', 'do you tasting'], 'Taste là hành động nếm có chủ ý ngay lúc nói, nên dùng Present Continuous.'),
        q(34, 'A: Why 33. ___ the soup? It’s not ready yet. (you/taste)\nB: To see if it 34. ___ sweet enough for the children. (taste)', 'tastes', ['is tasting', 'taste', 'is taste'], 'Taste là linking verb mô tả vị của soup; chủ ngữ it dùng tastes.'),
        q(35, 'A: Do you know where Mike 35. ___ from? (come)\nB: He’s from Glasgow. Actually, he’s there at the moment but he 36. ___ back tomorrow. (come)', 'comes', ['is coming', 'come', 'coming'], 'Come from diễn tả nguồn gốc của Mike nên dùng Present Simple.'),
        q(36, 'A: Do you know where Mike 35. ___ from? (come)\nB: He’s from Glasgow. Actually, he’s there at the moment but he 36. ___ back tomorrow. (come)', 'is coming', ['comes', 'come', 'is come'], 'Việc trở về ngày mai là kế hoạch đã sắp xếp nên dùng Present Continuous.'),
        q(37, 'A: I 37. ___ Charlotte has a toothache. (see)\nB: Yes. She’s in a lot of pain. She 38. ___ her dentist this afternoon, though. (see)', 'see', ['am seeing', 'sees', 'am see'], 'See mang nghĩa hiểu/nhận ra thông tin, là động từ trạng thái nên dùng Present Simple.'),
        q(38, 'A: I 37. ___ Charlotte has a toothache. (see)\nB: Yes. She’s in a lot of pain. She 38. ___ her dentist this afternoon, though. (see)', 'is seeing', ['sees', 'see', 'is see'], 'See mang nghĩa gặp theo lịch hẹn đã sắp xếp, nên dùng Present Continuous.')
      ]
    },
    {
      title: 'PHẦN 5 | PRESENT PERFECT SIMPLE & CONTINUOUS',
      help: 'Complete with the present perfect or the present perfect continuous. Choose the sentence that best completes each reply.',
      passageTitle: 'Five complete mini-dialogues',
      passage: [
        'A: Where’s Ben?\nB: 39. __________________________________________ (go / to the dentist’s)',
        'A: Where are you going on holiday this year?\nB: France. 40. __________________________________________ (be there / twice). I really love it!',
        'A: Why are your clothes so dirty?\nB: 41. __________________________________________ (play rugby / for two hours)',
        'A: Lucy looks very tired.\nB: Yes, 42. __________________________________________ (work hard / since 9:30 this morning)',
        'A: Are your parents at home?\nB: No, 43. __________________________________________ (go to the cinema / with friends)',
      ],
      questions: [
        q(39, 'A: Where’s Ben? — B: ___ (go / to the dentist’s)', "He has gone to the dentist's.", ["He has been to the dentist's.", "He is going to the dentist's.", "He went to the dentist's."], 'Has gone to cho biết Ben đã đi và hiện chưa quay lại; đó là lý do người nói không thấy Ben.'),
        q(40, 'A: Where are you going on holiday? — B: France. ___ (be there / twice)', 'I have been there twice.', ['I have gone there twice.', 'I am there twice.', 'I have been being there twice.'], 'Have been to diễn tả trải nghiệm đã đến và đã trở về; twice đếm số lần trải nghiệm.'),
        q(41, 'A: Why are your clothes so dirty? — B: ___ (play rugby / for two hours)', 'I have been playing rugby for two hours.', ['I have played rugby for two hours.', 'I am playing rugby for two hours.', 'I played rugby for two hours.'], 'Quần áo bẩn là kết quả hiện tại của một hoạt động kéo dài; for two hours nhấn mạnh quá trình nên dùng Present Perfect Continuous.'),
        q(42, 'A: Lucy looks very tired. — B: Yes, ___ (work hard / since 9:30 this morning)', 'she has been working hard since 9:30 this morning.', ['she has worked hard since 9:30 this morning.', 'she is working hard since 9:30 this morning.', 'she worked hard since 9:30 this morning.'], 'Dấu hiệu tired là kết quả của quá trình làm việc kéo dài từ 9:30 đến hiện tại, nên dùng Present Perfect Continuous.'),
        q(43, 'A: Are your parents at home? — B: No, ___ (go to the cinema / with friends)', 'they have gone to the cinema with friends.', ['they have been to the cinema with friends.', 'they are going to the cinema with friends.', 'they went to the cinema with friends.'], 'Have gone to cho biết bố mẹ đã đi rạp và hiện chưa về nhà.')
      ]
    },
    {
      title: 'PHẦN 6 | TIME EXPRESSIONS',
      help: 'Fill in: yet, since, for, tonight, often or how long. “Tonight” is used in example 0.',
      questions: [
        q(44, 'She hasn’t met Cathy ___.', 'yet', ['since', 'for', 'often'], 'Yet thường đứng cuối câu phủ định ở Present Perfect để diễn tả “cho đến giờ vẫn chưa”.'),
        q(45, 'I haven’t seen him ___ last week.', 'since', ['for', 'yet', 'often'], 'Since đi với mốc bắt đầu cụ thể: since last week.'),
        q(46, '___ have you been working here?', 'How long', ['Since', 'For', 'Yet'], 'How long dùng để hỏi khoảng thời gian một hành động đã kéo dài.'),
        q(47, 'She ___ cooks exotic dishes.', 'often', ['yet', 'since', 'for'], 'Often là trạng từ tần suất và đứng trước động từ thường cooks.'),
        q(48, 'Pablo has been in Lisbon ___ four years.', 'for', ['since', 'yet', 'often'], 'For đi với một khoảng thời gian: for four years.')
      ]
    },
    {
      title: 'PHẦN 7 | LETTER: PERFECT FORMS',
      help: 'Complete the letter using the present perfect or the present perfect continuous form.',
      passageTitle: 'Paula’s letter to Joanna',
      passage: [
        'Dear Joanna,',
        'I’m sorry to hear that you 0. __haven’t been__ (not/be) well recently. I hope you’re feeling better now.',
        'As you know, I 49. ______________ (not/exercise) for the last few months and of course, I 50. ______________ (put on) some weight.',
        'Anyway, I 51. ______________ (decide) that I really want to lose weight and get fit at the same time, so I 52. ______________ (join) the new gym in Greenstone Park. It’s got excellent facilities!',
        'I 53. ______________ (be) there several times and I really enjoy it. I 54. ______________ (make) some new friends there, too!',
        'What else? Well, Rebecca and I 55. ______________ (study) really hard for the last two weeks because we have a Maths exam tomorrow.',
        'That’s all for now. 56. ______________ (you/think) about where you want to go on holiday this summer? Maybe we can go together!',
        'Best wishes,',
        'Paula',
      ],
      questions: [
        q(49, 'I ___ for the last few months. (not/exercise)', "haven't been exercising", ["haven't exercised", "am not exercising", "didn't exercise"], 'For the last few months nhấn mạnh một tình trạng kéo dài đến hiện tại; Present Perfect Continuous làm rõ quá trình không tập luyện.'),
        q(50, 'Of course, I ___ some weight. (put on)', 'have put on', ['have been putting on', 'am putting on', 'put on'], 'Kết quả hiện tại là cân nặng đã tăng; trọng tâm nằm ở kết quả nên dùng Present Perfect Simple.'),
        q(51, 'I ___ that I really want to lose weight. (decide)', 'have decided', ['have been deciding', 'am deciding', 'decide'], 'Decide là quyết định đã hoàn thành và có kết quả ở hiện tại, nên dùng Present Perfect Simple.'),
        q(52, 'I ___ the new gym in Greenstone Park. (join)', 'have joined', ['have been joining', 'am joining', 'join'], 'Join là hành động hoàn tất; kết quả hiện tại là người viết đã trở thành thành viên của gym.'),
        q(53, 'I ___ there several times. (be)', 'have been', ['have gone', 'have been being', 'am'], 'Several times đếm số lần trải nghiệm; have been cho biết người viết đã đến và trở về.'),
        q(54, 'I ___ some new friends there, too! (make)', 'have made', ['have been making', 'am making', 'make'], 'Trọng tâm là kết quả hiện tại: đã có thêm những người bạn mới.'),
        q(55, 'Rebecca and I ___ really hard for the last two weeks. (study)', 'have been studying', ['have studied', 'are studying', 'studied'], 'For the last two weeks nhấn mạnh hoạt động học kéo dài liên tục đến hiện tại, nên dùng Present Perfect Continuous.'),
        q(56, '___ about where you want to go on holiday this summer? (you/think)', 'Have you thought', ['Have you been thinking', 'Do you think', 'Are you thinking'], 'Have you thought about… hỏi xem người nghe đã cân nhắc/đưa ra ý tưởng hay chưa; trọng tâm là kết quả của việc suy nghĩ.')
      ]
    },
    {
      title: 'PHẦN 8 | MIXED PRESENT FORMS',
      help: 'Put the verbs in brackets into the correct present forms. Example 0: I’m writing.',
      passageTitle: 'Luisa’s letter from Hawaii',
      passage: [
        'Dear Janet,',
        'How are you? I 0. __’m writing__ (write) to you from Hawaii. The hotel we 57. ______________ (stay) in is amazing!',
        'It’s very hot here and we 58. ______________ (have) a great time. Today, we 59. ______________ (be) all at the beach.',
        'Right now, my sisters, Carla and Daniela, 60. ______________ (build) a sandcastle. Mum and Dad 61. ______________ (play) beach volley for over an hour and Giovanni, my brother, 62. ______________ (just/go) diving with his friends.',
        'They 63. ______________ (go) diving every day. So far, I 64. ______________ (try) windsurfing. It’s really thrilling!',
        'We 65. ______________ (not/do) much sightseeing yet but tomorrow we 66. ______________ (go) on a trip round the island. We’re all looking forward to it.',
        'See you soon.',
        'Luisa',
      ],
      questions: [
        q(57, 'The hotel we ___ in is amazing! (stay)', 'are staying', ['stay', 'have stayed', 'stays'], 'Kỳ nghỉ và việc ở khách sạn chỉ mang tính tạm thời trong hiện tại, nên dùng Present Continuous.'),
        q(58, 'It’s very hot here and we ___ a great time. (have)', 'are having', ['have', 'have had', 'has'], 'Have a great time là trải nghiệm đang diễn ra trong chuyến đi, nên dùng Present Continuous.'),
        q(59, 'Today, we ___ all at the beach. (be)', 'are', ['are being', 'have been', 'is'], 'Be mô tả vị trí hiện tại của chủ ngữ we; dùng are.'),
        q(60, 'Right now, Carla and Daniela ___ a sandcastle. (build)', 'are building', ['build', 'have built', 'builds'], 'Right now cho biết hành động đang diễn ra, nên dùng Present Continuous.'),
        q(61, 'Mum and Dad ___ beach volley for over an hour. (play)', 'have been playing', ['are playing', 'have played', 'play'], 'For over an hour nhấn mạnh thời lượng của hoạt động kéo dài đến hiện tại, nên dùng Present Perfect Continuous.'),
        q(62, 'Giovanni ___ diving with his friends. (just/go)', 'has just gone', ['has just been', 'is just going', 'just goes'], 'Has just gone diễn tả Giovanni vừa đi lặn và hiện chưa quay lại; just đứng giữa has và gone.'),
        q(63, 'They ___ diving every day. (go)', 'go', ['are going', 'have gone', 'goes'], 'Every day diễn tả thói quen lặp lại nên dùng Present Simple.'),
        q(64, 'So far, I ___ windsurfing. (try)', 'have tried', ['have been trying', 'am trying', 'try'], 'So far và trải nghiệm đã hoàn tất hướng đến Present Perfect Simple.'),
        q(65, 'We ___ much sightseeing yet. (not/do)', "haven't done", ["haven't been doing", "aren't doing", "don't do"], 'Yet trong câu phủ định và trọng tâm là lượng hoạt động đã hoàn thành, nên dùng Present Perfect Simple.'),
        q(66, 'Tomorrow we ___ on a trip round the island. (go)', 'are going', ['go', 'have gone', 'goes'], 'Tomorrow cùng kế hoạch đã sắp xếp cho chuyến đi dùng Present Continuous với nghĩa tương lai.')
      ]
    }
  ];

export const quizQuestions = exercises.flatMap((exercise) =>
  exercise.questions.map((question) => ({ ...question, section: exercise.title, help: exercise.help }))
);
