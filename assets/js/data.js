/* Контент сайта: компания и объекты. Источник — alisperiaprebi.ge (RU/EN/KA версии). */
window.AA = {
  company: {
    phone: "+995 568 00 22 11",
    phoneHref: "tel:+995568002211",
    email: "info@alisperiaprebi.ge",
    facebook: "https://www.facebook.com/alisperiaprebi",
    tour: "https://www.alisperiaprebi.ge/3dtour/360/fasadi/",
    address: { ru: "ул. Кедиа, 10, Тбилиси", en: "10 Kedia St, Tbilisi", ka: "კედიას ქ. 10, თბილისი" },
    map: "https://maps.google.com/maps?q=Kedia%20St%2010%2C%20Tbilisi&z=15&output=embed"
  },

  locations: {
    beliashvili: {
      ru: "Белиашвили", en: "Beliashvili", ka: "ბელიაშვილი",
      map: "https://maps.google.com/maps?q=Nikoloz%20Bokhua%20St%201%2C%20Tbilisi&z=15&output=embed"
    },
    ninua: {
      ru: "Нинуа", en: "Ninua", ka: "ნინუა",
      map: "https://maps.google.com/maps?q=Vazha%20Ninua%20St%203%2C%20Tbilisi&z=15&output=embed"
    },
    didube: {
      ru: "Дидубе", en: "Didube", ka: "დიდუბე",
      map: "https://maps.google.com/maps?q=Kedia%20St%2010%2C%20Tbilisi&z=15&output=embed"
    }
  },

  /* status: building — строится; done — сдан. sale — продажи открыты (на старом сайте объект в «Активных»). */
  projects: [
    {
      id: "beliashvili-g", loc: "beliashvili", status: "building", progress: 90, year: 2027,
      name: { ru: "Белиашвили — блок Г", en: "Beliashvili — Block G", ka: "ბელიაშვილი — ბლოკი გ" },
      address: { ru: "ул. Н. Бохуа, 1", en: "1 N. Bokhua St", ka: "ნ. ბოხუას ქ. 1" },
      deadline: { ru: "декабрь 2027", en: "December 2027", ka: "დეკემბერი 2027" },
      area: [56.1, 92.5], floors: 17, livingFloors: 16, flats: 144, parking: 48, frame: "green", gallery: 4,
      lead: {
        ru: "17-этажный корпус на 144 квартиры: двух-, трёх- и четырёхкомнатные, все светлые, с современной планировкой. Два качественных лифта, система пожарной безопасности, 48 машиномест на этажах −1 и 1.",
        en: "A 17-storey building with 144 bright two-, three- and four-room apartments with modern layouts. Two high-quality lifts, a fire-safety system and 48 parking spaces on levels −1 and 1.",
        ka: "17-სართულიანი კორპუსი 144 ბინით: ორ-, სამ- და ოთხოთახიანი, ნათელი, თანამედროვე გეგმარებით. ორი მაღალი ხარისხის ლიფტი, ხანძარსაწინააღმდეგო სისტემა და 48 პარკინგის ადგილი (−1 და 1 სართულები)."
      }
    },
    {
      id: "beliashvili-b", loc: "beliashvili", status: "building", progress: 40, year: 2028,
      name: { ru: "Белиашвили — блок Б", en: "Beliashvili — Block B", ka: "ბელიაშვილი — ბლოკი ბ" },
      address: { ru: "ул. Н. Бохуа, 1", en: "1 N. Bokhua St", ka: "ნ. ბოხუას ქ. 1" },
      deadline: { ru: "август 2028", en: "August 2028", ka: "აგვისტო 2028" },
      area: [44.9, 115], floors: 12, livingFloors: 10, flats: 160, parking: 81, frame: "green", gallery: 2,
      lead: {
        ru: "12-этажный корпус на 160 квартир — от студий до четырёхкомнатных. Самый большой паркинг комплекса: 81 машиноместо на этажах −1 и 1.",
        en: "A 12-storey building with 160 apartments, from studios to four-room units. The largest car park of the complex: 81 spaces on levels −1 and 1.",
        ka: "12-სართულიანი კორპუსი 160 ბინით — სტუდიოდან ოთხოთახიანამდე. კომპლექსის ყველაზე დიდი პარკინგი: 81 ადგილი (−1 და 1 სართულები)."
      }
    },
    {
      id: "beliashvili-a", loc: "beliashvili", status: "building", progress: 1, year: 2029,
      name: { ru: "Белиашвили — блок А", en: "Beliashvili — Block A", ka: "ბელიაშვილი — ბლოკი ა" },
      address: { ru: "ул. Н. Бохуа, 3а", en: "3a N. Bokhua St", ka: "ნ. ბოხუას ქ. 3ა" },
      deadline: { ru: "декабрь 2029", en: "December 2029", ka: "დეკემბერი 2029" },
      area: [44.6, 68.1], floors: 14, livingFloors: 12, flats: 120, parking: 45, frame: "green", gallery: 3,
      lead: {
        ru: "Новый 14-этажный корпус на 120 квартир: студии, двух- и трёхкомнатные. Старт строительства — лучшие цены и полный выбор планировок.",
        en: "A new 14-storey building with 120 apartments: studios, two- and three-room units. Construction has just started — the best prices and the full choice of layouts.",
        ka: "ახალი 14-სართულიანი კორპუსი 120 ბინით: სტუდიოები, ორ- და სამოთახიანი ბინები. მშენებლობის დასაწყისი — საუკეთესო ფასები და გეგმარებების სრული არჩევანი."
      }
    },
    {
      id: "ninua-2a", loc: "ninua", status: "done", sale: true, progress: 100, year: 2025,
      name: { ru: "Ваш дом на Нинуа 2 — блок А", en: "Your Home on Ninua 2 — Block A", ka: "შენი სახლი ნინუაზე 2ა" },
      address: { ru: "ул. В. Нинуа, 3", en: "3 V. Ninua St", ka: "ვ. ნინუას ქ. 3" },
      deadline: { ru: "июль 2025", en: "July 2025", ka: "ივლისი 2025" },
      area: [52.8, 85.2], floors: 15, livingFloors: 15, flats: 160, frame: "white", metro: true, gallery: 8,
      lead: {
        ru: "15-этажный корпус на 160 квартир в 2 минутах от метро «Гоциридзе». Озеленённый двор, двухуровневый подземный паркинг и гостевые места у дома.",
        en: "A 15-storey building with 160 apartments, a 2-minute walk from Gotsiridze metro. Landscaped courtyard, two-level underground parking and guest spaces by the building.",
        ka: "15-სართულიანი კორპუსი 160 ბინით, მეტრო „გოცირიძიდან“ 2 წუთში. გამწვანებული ეზო, ორდონიანი მიწისქვეშა პარკინგი და სტუმრების ადგილები."
      }
    },
    {
      id: "ninua-2b", loc: "ninua", status: "done", sale: true, progress: 100, year: 2025, galleryFrom: "ninua-2a",
      name: { ru: "Ваш дом на Нинуа 2 — блок Б", en: "Your Home on Ninua 2 — Block B", ka: "შენი სახლი ნინუაზე 2ბ" },
      address: { ru: "ул. В. Нинуа, 3", en: "3 V. Ninua St", ka: "ვ. ნინუას ქ. 3" },
      deadline: { ru: "июль 2025", en: "July 2025", ka: "ივლისი 2025" },
      area: [52.8, 85.2], floors: 15, livingFloors: 14, flats: 168, frame: "white", metro: true, gallery: 8,
      lead: {
        ru: "Второй корпус комплекса на Нинуа: 168 квартир от студий до четырёхкомнатных, 2 лифта, подземный паркинг. До метро «Гоциридзе» — 2 минуты пешком.",
        en: "The second building of the Ninua complex: 168 apartments from studios to four-room units, 2 lifts, underground parking. Gotsiridze metro is a 2-minute walk.",
        ka: "ნინუას კომპლექსის მეორე კორპუსი: 168 ბინა სტუდიოდან ოთხოთახიანამდე, 2 ლიფტი, მიწისქვეშა პარკინგი. მეტრო „გოცირიძემდე“ — 2 წუთი ფეხით."
      }
    },
    {
      id: "ninua", loc: "ninua", status: "done", progress: 100, year: 2023,
      name: { ru: "Ваш дом на Нинуа", en: "Your Home on Ninua", ka: "შენი სახლი ნინუაზე" },
      address: { ru: "ул. В. Нинуа, 3", en: "3 V. Ninua St", ka: "ვ. ნინუას ქ. 3" },
      deadline: { ru: "июль 2023", en: "July 2023", ka: "ივლისი 2023" },
      area: [47.4, 86.1], floors: 12, livingFloors: 12, flats: 130, frame: "white", metro: true, gallery: 5,
      lead: {
        ru: "12-этажный дом на 130 квартир — студии, двух- и трёхкомнатные. В глубине квартала, вдали от шумной улицы, в 2 минутах от метро.",
        en: "A 12-storey building with 130 apartments — studios, two- and three-room units. Set back from the busy street, 2 minutes from the metro.",
        ka: "12-სართულიანი სახლი 130 ბინით — სტუდიოები, ორ- და სამოთახიანი. კვარტლის სიღრმეში, ხმაურიანი ქუჩიდან მოშორებით, მეტროდან 2 წუთში."
      }
    },
    {
      id: "didube-5", loc: "didube", status: "done", progress: 100, year: 2022,
      name: { ru: "Ваш дом в Дидубе 5", en: "Your Home in Didube 5", ka: "შენი სახლი დიდუბეში 5" },
      address: { ru: "ул. Кедиа, 10, блок V", en: "10 Kedia St, Block V", ka: "კედიას ქ. 10, ბლოკი V" },
      deadline: { ru: "2022", en: "2022", ka: "2022" },
      area: [44.0, 75.4], floors: 10, livingFloors: 9, flats: 99, frame: "white-basic", gallery: 3,
      lead: {
        ru: "10-этажный кирпично-монолитный дом на 99 квартир — от студий до трёхкомнатных, со скоростными бесшумными лифтами.",
        en: "A 10-storey brick-and-monolith building with 99 apartments, from studios to three-room units, with fast, quiet lifts.",
        ka: "10-სართულიანი აგურ-მონოლითური სახლი 99 ბინით — სტუდიოდან სამოთახიანამდე, სწრაფი და უხმაურო ლიფტებით."
      }
    },
    {
      id: "didube-4", loc: "didube", status: "done", progress: 100, year: 2022,
      name: { ru: "Ваш дом в Дидубе 4", en: "Your Home in Didube 4", ka: "შენი სახლი დიდუბეში 4" },
      address: { ru: "ул. Кедиа, 10, блок IV", en: "10 Kedia St, Block IV", ka: "კედიას ქ. 10, ბლოკი IV" },
      deadline: { ru: "2022", en: "2022", ka: "2022" },
      area: [59.0, 116.5], floors: 20, livingFloors: 19, flats: 133, frame: "white-basic", gallery: 6,
      lead: {
        ru: "Самый высокий дом квартала на Кедиа: 20 этажей, 133 квартиры — от студий до четырёхкомнатных.",
        en: "The tallest building of the Kedia block: 20 storeys, 133 apartments from studios to four-room units.",
        ka: "კედიას კვარტლის ყველაზე მაღალი სახლი: 20 სართული, 133 ბინა — სტუდიოდან ოთხოთახიანამდე."
      }
    },
    {
      id: "didube-3", loc: "didube", status: "done", progress: 100, year: 2020,
      name: { ru: "Ваш дом в Дидубе 3", en: "Your Home in Didube 3", ka: "შენი სახლი დიდუბეში 3" },
      address: { ru: "ул. Кедиа, 10, блок III", en: "10 Kedia St, Block III", ka: "კედიას ქ. 10, ბლოკი III" },
      deadline: { ru: "2020", en: "2020", ka: "2020" },
      area: [39.5, 105.2], floors: 10, livingFloors: 9, flats: 81, frame: "white-basic", gallery: 5,
      lead: {
        ru: "10-этажный дом на 81 квартиру в глубине квартала: озеленённый двор, удобные планировки от студий до четырёхкомнатных.",
        en: "A 10-storey building with 81 apartments deep inside the block: a green courtyard and practical layouts from studios to four-room units.",
        ka: "10-სართულიანი სახლი 81 ბინით კვარტლის სიღრმეში: გამწვანებული ეზო და მოხერხებული გეგმარებები სტუდიოდან ოთხოთახიანამდე."
      }
    },
    {
      id: "didube-2", loc: "didube", status: "done", progress: 100, year: 2019,
      name: { ru: "Ваш дом в Дидубе 2", en: "Your Home in Didube 2", ka: "შენი სახლი დიდუბეში 2" },
      address: { ru: "ул. Кедиа, 10, блок II", en: "10 Kedia St, Block II", ka: "კედიას ქ. 10, ბლოკი II" },
      deadline: { ru: "2019", en: "2019", ka: "2019" },
      area: [41.5, 97.1], floors: 10, livingFloors: 9, flats: 81, frame: "white-basic", gallery: 5,
      lead: {
        ru: "10-этажный дом на 81 квартиру с паркингом и благоустроенным двором: детские и спортивные площадки.",
        en: "A 10-storey building with 81 apartments, parking and a landscaped courtyard with playgrounds and sports areas.",
        ka: "10-სართულიანი სახლი 81 ბინით, პარკინგით და კეთილმოწყობილი ეზოთი: საბავშვო და სპორტული მოედნები."
      }
    },
    {
      id: "didube", loc: "didube", status: "done", progress: 100, year: 2018,
      name: { ru: "Ваш дом в Дидубе", en: "Your Home in Didube", ka: "შენი სახლი დიდუბეში" },
      address: { ru: "ул. Кедиа, 10", en: "10 Kedia St", ka: "კედიას ქ. 10" },
      deadline: { ru: "2018", en: "2018", ka: "2018" },
      area: [38.9, 162], floors: 10, livingFloors: 9, flats: 60, frame: "white-basic", gallery: 5,
      lead: {
        ru: "Первый дом компании: 10 этажей, 60 квартир — от студий до просторных 162 м². С него начался квартал на Кедиа.",
        en: "The company's first building: 10 storeys, 60 apartments from studios up to a spacious 162 m². The Kedia block started here.",
        ka: "კომპანიის პირველი სახლი: 10 სართული, 60 ბინა — სტუდიოდან 162 მ²-მდე. აქედან დაიწყო კვარტალი კედიაზე."
      }
    }
  ],

  /* Состояние сдачи квартир */
  frames: {
    green: {
      title: { ru: "Зелёный каркас", en: "Green frame", ka: "მწვანე კარკასი" },
      items: {
        ru: ["Железная входная дверь", "Алюминиевые окна и двери", "Внутренние перегородки из блока, оштукатурены", "Трубы отопления и водопровода в полу", "Стяжка пола под ламинат или паркет", "Полностью облицованный балкон", "Газ подведён к кухне и месту котла", "Электропроводка до квартиры", "Счётчики газа, воды и электричества"],
        en: ["Steel entrance door", "Aluminium windows and doors", "Plastered block partitions", "Heating and water pipes laid under the floor", "Floor screed ready for laminate or parquet", "Fully finished balcony", "Gas pipe to the kitchen and boiler spot", "Electrical wiring to the apartment", "Gas, water and electricity meters"],
        ka: ["რკინის შესასვლელი კარი", "ალუმინის ფანჯრები და კარები", "ბლოკით ამოყვანილი და შელესილი ტიხრები", "იატაკქვეშ გაყვანილი გათბობისა და წყლის მილები", "იატაკის მოჭიმვა ლამინატისა ან პარკეტისთვის", "სრულად მოპირკეთებული აივანი", "ბუნებრივი აირის მილი სამზარეულომდე და ქვაბამდე", "ელექტროგაყვანილობა ბინამდე", "გაზის, წყლისა და ელექტროენერგიის მრიცხველები"]
      }
    },
    white: {
      title: { ru: "Белый каркас", en: "White frame", ka: "თეთრი კარკასი" },
      items: {
        ru: ["Железная входная дверь", "Металлопластиковые окна и двери", "Внутренние перегородки из блока, оштукатурены", "Стяжка пола под ламинат или паркет", "Газ подведён к кухне и месту котла", "Вода и электричество подведены к квартире", "Счётчики газа, воды и электричества"],
        en: ["Steel entrance door", "Metal-plastic windows and doors", "Plastered block partitions", "Floor screed ready for laminate or parquet", "Gas pipe to the kitchen and boiler spot", "Water and electricity brought to the apartment", "Gas, water and electricity meters"],
        ka: ["რკინის შესასვლელი კარი", "მეტალოპლასტმასის ფანჯრები და კარები", "ბლოკით ამოყვანილი და შელესილი ტიხრები", "იატაკის მოჭიმვა ლამინატისა ან პარკეტისთვის", "ბუნებრივი აირის მილი სამზარეულომდე და ქვაბამდე", "წყალი და ელექტროენერგია ბინამდე", "გაზის, წყლისა და ელექტროენერგიის მრიცხველები"]
      }
    },
    "white-basic": {
      title: { ru: "Белый каркас", en: "White frame", ka: "თეთრი კარკასი" },
      items: {
        ru: ["Железная входная дверь", "Стяжка пола под ламинат или паркет", "Окна и двери со стеклопакетом"],
        en: ["Steel entrance door", "Floor screed ready for laminate or parquet", "Double-glazed windows and doors"],
        ka: ["რკინის შესასვლელი კარი", "იატაკის მოჭიმვა ლამინატისა ან პარკეტისთვის", "ორმაგი მინაპაკეტით ფანჯრები და კარები"]
      }
    }
  }
};
