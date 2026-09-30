export interface GenderResult {
  gender: 'Male' | 'Female';
  label: string;
}

export function detectGenderFromName(name: string, phone: string = ''): GenderResult {
  if (!name) {
    return { gender: 'Male', label: 'Male (পুরুষ)' };
  }

  const clean = name.toLowerCase().trim();

  // Female keywords common in Bangladeshi & South Asian names
  const femaleKeywords = [
    'akter', 'akteri', 'aktar', 'khatun', 'begum', 'sultana', 'jannat', 'jannatul',
    'nusrat', 'tanjina', 'sadia', 'sumaiya', 'afrin', 'mim', 'ritu', 'ratri',
    'shimu', 'moni', 'sharmin', 'farhana', 'marufa', 'tamanna', 'tasnim',
    'nigar', 'rupa', 'shirin', 'sabina', 'asma', 'tania', 'suraiya', 'rokeya',
    'salma', 'nazma', 'mousumi', 'mowsumi', 'shampa', 'tumpa', 'shanta',
    'liza', 'samira', 'afia', 'umme', 'mst', 'mst.', 'shathi', 'bristi',
    'koli', 'poly', 'mita', 'shila', 'ananya', 'anonna', 'taslima', 'ruma',
    'khadija', 'ayesha', 'rabeya', 'lubna', 'sonia', 'fariha', 'promi',
    'meghla', 'priya', 'priyanka', 'puja', 'mitu', 'shikha', 'tahmina',
    'fahmina', 'nadia', 'rubina', 'rina', 'bina', 'dola', 'mohona', 'fatema',
    'fatima', 'nasrin', 'parvin', 'shahanaz', 'sheuly', 'shoma', 'khuku',
    // Bengali script female matches
    'মোসা:', 'মোসাম্মৎ', 'মোসাম্মদ', 'আক্তার', 'বেগম', 'খাতুন', 'সুলতানা', 'ফাতেমা',
    'জান্নাত', 'সাদিয়া', 'নুসরাত', 'ফারহানা', 'শারমিন', 'নাজমিন', 'তাসলিমা', 'রাত্রি'
  ];

  // Male keywords common in Bangladeshi & South Asian names
  const maleKeywords = [
    'md', 'md.', 'mohammad', 'mohammed', 'ahmed', 'hossain', 'hasan', 'ali',
    'khan', 'rahman', 'islam', 'shakib', 'sakib', 'rakib', 'sabbir', 'tanvir',
    'mehedi', 'mahfuz', 'ashik', 'arif', 'sohel', 'rana', 'habib', 'rubel',
    'mizan', 'kawsar', 'saiful', 'kamrul', 'al-amin', 'alamin', 'masud',
    'shahadat', 'faruk', 'rashed', 'tariq', 'tareq', 'abdul', 'abdullah',
    'monir', 'enamul', 'jahid', 'nahid', 'shahin', 'shawon', 'bijoy', 'joy',
    'palash', 'sajib', 'sujon', 'anwar', 'bablu', 'ripon', 'badhon', 'nazmul',
    'hasibul', 'shafiq', 'rafiq', 'jabbar', 'salam', 'barkat', 'babu', 'bhai',
    // Bengali script male matches
    'মো:', 'মোহাম্মদ', 'হাসান', 'হোসেন', 'আহমেদ', 'রহমান', 'আলী', 'খান', 'সাকিব',
    'রাকিব', 'তানভীর', 'মেহেদী', 'সাব্বির', 'আশরাফ', 'তারেক', 'সাইফুল'
  ];

  const words = clean.split(/[\s,._-]+/);

  // Check word match for female
  for (const word of words) {
    if (femaleKeywords.includes(word)) {
      return { gender: 'Female', label: 'Female (মহিলা)' };
    }
  }

  // Check word match for male
  for (const word of words) {
    if (maleKeywords.includes(word)) {
      return { gender: 'Male', label: 'Male (পুরুষ)' };
    }
  }

  // Check substring in full name
  for (const kw of femaleKeywords) {
    if (clean.includes(kw)) {
      return { gender: 'Female', label: 'Female (মহিলা)' };
    }
  }

  for (const kw of maleKeywords) {
    if (clean.includes(kw)) {
      return { gender: 'Male', label: 'Male (পুরুষ)' };
    }
  }

  // If private or subscriber without obvious name, calculate deterministic gender
  if (phone) {
    const sum = phone.split('').reduce((acc, c) => acc + (parseInt(c, 10) || 0), 0);
    if (sum % 4 === 0) {
      return { gender: 'Female', label: 'Female (মহিলা)' };
    }
  }

  return { gender: 'Male', label: 'Male (পুরুষ)' };
}
