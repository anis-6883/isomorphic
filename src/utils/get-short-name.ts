export default function getShortName( name : string | undefined , short: string | null = null): string {
  if (!name) {
    console.log(name)
    return "" ;
    
  } else {
   
    const wordCount = name.split(' ').length;
    if (wordCount === 1) {
      return name;
    } else if (wordCount === 2) {
      const words = name.split(' ');
      const firstLetter = words[0][0];
      return `${firstLetter}. ${words[1]}`;
    } else {
      if (short === null || name === short) {
        const words = name.split(' ');
        const firstLetter = words[0][0];
        return `${firstLetter}. ${words[words.length - 1]}`;
      } else {
        return short;
      }
    }
  }
}
