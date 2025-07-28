document.body.hidden = false;

nForm = document.querySelector('#nodus form');
lForm = document.querySelector('#linkus form');

// nForm.current.checked = true;

{ // current
  nForm.name.value = 'They shall in all Cases, except Treason, Felony and Breach of the Person attainted'.split(' ').slice(0, Math.random() * 14 + 1).join(' ');

  text = 'He may adjourn them to such Time as he shall not receive within that Period any other Emolument from the United States, whose Appointments are not herein otherwise provided for, and which shall be a Representative who shall not, when elected, be an Inhabitant of the Person attainted. Nor any State be formed by the Junction of two Witnesses to the same throughout the United States. A quorum for this Purpose shall consist of a Senate and House of Representatives may be absolutely necessary for executing its inspection Laws: and the net Produce of all Duties and Imposts, laid by any State be formed or erected within the Jurisdiction of any other Emolument from the United States, or any of the States shall be a Party. The House of Representatives shall immediately chuse by Ballot one of them against Invasion. And the net Produce of all Duties and Imposts, laid by any State on Imports or Exports, except what may be absolutely necessary for executing its inspection Laws: and the Day on which they shall give their Votes. And such Officer shall then act as President, and such Trial shall be at such Place or Places as the Congress may by Law, provide for calling forth the Militia to execute the Laws thereof, escaping into another, shall, in the Presence of the Independence of the United States, except in Cases of Impeachment. ' + 'And he shall not receive within that Period any other Place than that in which the two Houses shall be the Vice President, or when he shall exercise the Office of President. To borrow money on the credit of the Conventions of nine States shall be composed of two Senators from each State have one Vote. And if approved by two thirds of the Members of the several States which may be entitled in the Congress: but no Senator or Representative, or Person holding any Office of Profit or Trust under them, shall, without the Consent of Congress, shall, without the Consent of the President, the Person having the greatest Number of Votes, then the House of Representatives shall immediately chuse by Ballot one of them as may in their respective States, and vote by Ballot the Vice-President. All legislative Powers herein granted shall be vested in one supreme Court, and all civil Officers of the Senate, shall appoint Ambassadors, other public Ministers and Consuls, Judges of the Senators of the first Election, they shall be a Representative who shall flee from Justice, and be found in another State, shall on demand of the Seventeenth Amendment. And the Congress may by Law have directed.'

  sentences = text.split('. ');

  nForm.description.value = text.split(' ').slice(0, Math.random() * 436 + 1).join(' ') + '.';

  linkedList = document.querySelector('#linked');
  liTemplate = linked.querySelector('template').content.firstElementChild;

  buildItem = () => {
    item = liTemplate.cloneNode(true);
    const [out, btn] = item.querySelectorAll('output, button');
    sentence = sentences[Math.floor(Math.random() * sentences.length)];
    const name = sentence.split(' ').slice(0, Math.random() * 14 + 1).join(' ');
    out.value = name;
    btn.innerText = name;
    item.classList.add(['incoming', 'outgoing', 'two-way'][Math.floor(Math.random() * 3)]);
    return item;
  }

  items = Array.from({ length: Math.random() * 12 }).map(buildItem);

  linkedList.replaceChildren(...items);
}

{ // many
  nodeList = document.querySelector('#nodes');
  // liTemplate = nodeList.querySelector('template').content.firstElementChild;

  text = "To establish an uniform Rule of Naturalization, and uniform Laws on the Application of the Legislature, or of his Death, Resignation, or otherwise, during the Recess of the Independence of the United States, at the time of the most numerous Branch of the State where the said Crimes shall have Power To lay and collect Taxes, Duties, Imposts and Excises, to pay the Debts and provide for the same Term, be elected, as follows. The Judges, both of the United States, and between a State, or with a foreign Power, or engage in War, unless actually invaded, or in such Manner as the Legislature of the Government of the United States, directed to the State having Jurisdiction of the Crime. The House of Representatives shall immediately chuse by Ballot one of them as may be employed in the Case of the Removal of the Vice President, declaring what Officer shall then act as President, and such Trial shall be held in the Case of Removal, Death, Resignation or Inability, both of the Union, suppress Insurrections and repel Invasions. All Debts contracted and Engagements entered into, before the Adoption of this Constitution between the States now existing shall think proper to admit, shall not be diminished during the Period for which he shall be chosen. Which Day shall be divided as equally as may be chosen every second Year. But when not committed within any State, the Trial shall be at such Place or Places as the Congress may by general Laws prescribe the Manner in which he shall have been created, or the Emoluments whereof shall have been encreased during such time. The Ratification of the Conventions of nine States shall be necessary to a Choice. The judicial Power of the United States shall guarantee to every State shall be the same overt Act, or on Confession in open Court. In all Cases affecting Ambassadors, other public Ministers and Consuls, and those in which the two Houses shall deem it necessary, shall propose Amendments to this Constitution, or, on the subject of Bankruptcies throughout the United States, directed to the Year one thousand eight hundred and eight shall in any Department or Officer thereof. He shall receive Ambassadors and other public Ministers. The Number of Representatives shall immediately chuse by Ballot one of them as may be into three Classes. And if Vacancies happen by Resignation, or otherwise, during the Life of the Person having the greatest Number of Votes of the Union, suppress Insurrections and repel Invasions. Which Day shall be at such Place or Places as the Congress may by Law, provide for the Government and Regulation of Commerce or Revenue to the Ports of one State over those of another: nor shall Vessels bound to, or from, one State, be obliged to enter, clear, or pay Duties in another. To define and punish Piracies and Felonies committed on the Execution of his Office, he shall exercise the Office of President of the Senate. Provided that no Amendment which may be included within this Union, according to their respective Writings and Discoveries. A quorum for this Purpose shall consist of a Member or Members from two thirds of the Senate shall, in the Presence of the Officers, and the Authority of the Militia of the several State Legislatures, and all Treaties made, or which shall be by Jury. A quorum for this Purpose shall consist of a Member or Members from two thirds of the Senate and House of Representatives shall be the same State claiming Lands under Grants of different States, and between a State, or the Citizens thereof, and foreign States, Citizens or Subjects. Nor any State be formed by the Junction of two thirds of the several States, and the Electors shall be valid to all Intents and Purposes, as Part of this Constitution, when ratified by the Legislatures of the Fourteenth Amendment."

  sentences = text.split(/(?<=\.) /);

  buildItem = () => {
    item = liTemplate.cloneNode(true);
    const [inc, out, name, desc] = item.querySelectorAll('.incoming, .outgoing, .name, .description');
    inc.value = Math.floor(Math.random() * 9);
    out.value = Math.floor(Math.random() * 9);
    sentence = sentences[Math.floor(Math.random() * sentences.length)];
    name.textContent = sentence.split(' ').slice(0, Math.floor(Math.random() * 12 + 1)).join(' ');
    desc.textContent = Array.from({ length: Math.floor(Math.random() * 14) }).fill().map(() => sentences[Math.floor(Math.random() * sentences.length)]).join('. ');
    return item;
  }

  // items = Array.from({ length: Math.random() * 12 }).fill().map(buildItem);

  // nodeList.replaceChildren(...items);
}

lForm.related.checked = true;

{ // related
  linkList = related.querySelector('.links');
  liTemplate = related.querySelector('template').content.cloneNode(true);
  description = Array.from({ length: Math.floor(Math.random() * 14) }).fill().map(() => sentences[Math.floor(Math.random() * sentences.length)]).join('. ');

  buildItem = () => {
    item = liTemplate.cloneNode(true);
    const [h3, p1, p2] = item.querySelectorAll('h3, p');
    sentence = sentences[Math.floor(Math.random() * sentences.length)];
    h3.textContent = sentence.split(' ').slice(0, Math.floor(Math.random() * 12 + 1)).join(' ');
    p1.textContent = Array.from({ length: Math.floor(Math.random() * 14) }).fill().map(() => sentences[Math.floor(Math.random() * sentences.length)]).join('. ');
    p2.textContent = description;
    return item;
  }
  
  items = Array.from({ length: Math.random() * 3 }).fill().map(buildItem);
  linkList.replaceChildren(...items);
}

{ // unrelated
  linkList = unrelated.querySelector('.links');
  liTemplate = unrelated.querySelector('template').content.cloneNode(true);

  buildItem = () => {
    item = liTemplate.cloneNode(true);
    const [out1, out2, p] = item.querySelectorAll('output, p');
    name1 = sentences[Math.floor(Math.random() * sentences.length)].split(' ').slice(0, Math.floor(Math.random() * 12 + 1)).join(' ');
    name2 = sentences[Math.floor(Math.random() * sentences.length)].split(' ').slice(0, Math.floor(Math.random() * 12 + 1)).join(' ');
    out1.value = name1;
    out2.value = name2;
    p.textContent = Array.from({ length: Math.floor(Math.random() * 10) }).fill().map(() => sentences[Math.floor(Math.random() * sentences.length)]).join('. ');
    return item;
  }
  
  items = Array.from({ length: Math.random() * 14 }).fill().map(buildItem);
  linkList.replaceChildren(...items);
}

const [newNodeDialog, newLinkDialog, editNodeDialog, editLinkDialog, deleteNodeDialog, deleteLinkDialog, informDialog, menuDialog, statsDialog, splashDialog] = document.querySelectorAll('dialog');

// newNodeDialog.showModal();
// newLinkDialog.showModal();
// editNodeDialog.showModal();
// editLinkDialog.showModal();
// deleteNodeDialog.showModal();
// deleteLinkDialog.showModal();
// informDialog.showModal();
// menuDialog.showModal();
// statsDialog.showModal();
// splashDialog.showModal();
