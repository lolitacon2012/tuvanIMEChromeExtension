## tuvanIMEChromeExtension
A chrome extension which provides Tuvan language input support! You can use it to type in Russian also!
No need to add input method on your OS!

Made with 💖💖💖 by a linguaphile (*≧∀≦*) 

NOTE: This project is still under development and there are many bugs and I don't know much about how to write proper Chrome Extension ... Use it at your own risk.  

</br></br>
### What does it do ⚙️
This chrome extension aims to provide an expanded Cyrillic letter input method designed for Tuvan language, a minority language written in standard Cyrillic letter and 3 special letters which are not used in Russian.
</br>
##### А Б В Г Д Е Ё Ж З И Й К Л М Н Ң О Ө  
##### а б в г д е ё ж з и й к л м н ң о ө

##### П Р С Т У Ү Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я  
##### п р с т у ү ф х ц ч ш щ ъ ы ь э ю я  

<small> (Special pronunciation characters will be added in the future)</small>

Here we have Ң, Ө and Ү which are not found in Russian alphabet.  

</br></br>
### How to use ⌨️
I did not include any compression or package management and did not pack it for now so just clone the repo and use directly on chrome.
1. Go to chrome://extensions
2. Turn on developer mode
3. Load unpacked extension

After the extensioin is loaded, click on the icon to turn extension on or off (need refresh to take effect. will be fixed).

Make sure your system input language is English. Press Shift key twice (~300ms) to switch between Tuvan language and English. Do not use other IME if that IME does not generate latin alphabet.

You will see a small indicator beside the cursor when in Tuvan input mode.  

</br></br>
### Key mapping 🗺️

Some Tuvan letters can only be typed out with key combination.Here is the full list of all letter-keyboard mapping of this IME. Please note that the keyboard mapping is almost same with <strong>Windows 10 Russian - Mnemonic</strong>, but there are some differences.

	A     =>     А
    B     =>     Б
    V     =>     В
    G     =>     Г
    D     =>     Д
    E     =>     Е
    JO/YO =>     Ё
    X     =>     Ж
    Z     =>     З
    I     =>     И
    JJ    =>     Й
    K     =>     К
    L     =>     Л
    M     =>     М
    N     =>     Н
    NG    =>     Ң
    OO    =>     О
    OH    =>     Ө  
	P     =>     П
    R     =>     Р
    SS    =>     С
    T     =>     Т
    UU    =>     У
    UH    =>     Ү
    F     =>     Ф
    H     =>     Х
    CC    =>     Ц
    CH    =>     Ч
    W     =>     Ш
    SC    =>     Щ
    `     =>     Ъ
    YY    =>     Ы
    '     =>     Ь
    JE/YE =>     Э
    JU/YU =>     Ю
    Q     =>     Я  
    
For letters requiring key combination to type (Ё Ю Ң О Ө С У Ү Ц Ч Щ Ы Э Ю), after the first key is typed, it will wait for the second key press event. If a legal combination is inputted, the corresponding letter will appear. Otherwise 2 letters which are mapped to 2 keys user just inputted will appear.

For example:
- "Y" is typed: Nothing;
- Then "U" is typed: "Ю";
- Then "J" is typed: "Ю";
- Then "R" is typed: "ЮЙР"; because "JR" does not map to any legal combination  

</br></br>
### Known issues 😔
- Only work with `<input>` and `<textarea>`. I have not find any method to hijack keyboard input event and make this IME work for Rich Text Editors such as Google Doc and Zhihu (知乎);
- Does not support CapsLock yet;
- Sometimes VM-Script will execute input function twice, causing duplicated input. Looking into this issue now.
- Conflict with some Third-party input methods such as Sougou Pinyin Shurufa (搜狗拼音输入法).  

</br></br>
### Special thanks 🙏
Takashima Hisao, for his impressive Tuvan language textbook 『基礎トゥヴァ語文法』and『トゥヴァ語会話集』
