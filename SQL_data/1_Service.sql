
Use Prj4

Insert into dbo.tbUser([userDOB], [userMail], [userName], [userStatus], [userTel]) Values 
(1996-10-20,'lecongdat@gmail.com','DatLe',1,'0394641271'),
(1995-10-20,'ElisaMuoi@gmail.com','Elisa',1,'dat'),
(1994-10-20,'duytantran@gmail.com','Duy',1,'0708886925'),
(1993-10-20,'catnghiemhieutuan@gmail.com','TuanCat',1,'0909090909'),
(1993-10-20,'vohuynhnhu@gmail.com','Nichai',1,'0909090908')



Insert into dbo.tbService(SerName, SerDes, SerShortDes,[Status]) values
('Pet Grooming','Grooming is an important part of your pets care. All pets benefit from regular grooming, whether it is a short haired breed or one with a long or fluffy coat, regular grooming helps to ensure your pet is healthy and comfortable.

Keeping your pet�s coat clean by removing dirt and dead hair helps encourage new hair growth and reduces the amount of hair deposited on household furniture. Grooming regularly helps lower the chance of various health problems, such as parasite infestation, thrush, scratches, and other skin problems. Grooming also helps to stimulate new coat growth and prevents the formation of knots and tangles which may lead to skin irritation. Habitual grooming allows monitoring of the pet�s health by checking for cuts, heat, swelling, lameness, or changes in temperament, all of which could be indicative of illness forging of a closer bond between pet and owner. ','Making dogs & cats look great is our passion!',1),

('Vaccination Supply','Pet vaccines exist to prevent your pet from falling ill. They provide immunity from a range of infectious diseases that can affect both humans and animals.

In order to be effective, vaccines need to contain an agent similar to the microorganism that causes the disease. Once injected, this agent stimulates the body�s immune system, allowing the body to recognise it as a threat. The immune system will then attack the foreign agent and remember it so that in the future, should the body encounter the same disease, the immune system will be prepared to fight it off.

It is essential to know that vaccines work better in a healthy and relaxed animal. It usually takes around seven days for the body to respond and develop immunity. Therefore, giving a vaccine to your pet while it is already sick will be less effective. Vaccines do not work as a cure for diseases, but rather as a prevention.','Keeping your pet�s vaccinations up-to-date is crucial for a healthy lifestyle and proper pet development.',1),

('Pet Hotel','Stay Pet Hotel  offers a unique combination of services and features, such as a choice between kennel-free boarding and comfortable private suites, daycare 7 days a week, and 24 hour supervision� meaning that your pups are never left unattended!

Stay is located on NE Columbia Blvd, less than 10 minutes from PDX, and we have staff on site 24 hours a day, 365 days a year. The dogs in our care are never left unattended.

Why STAY is THE place for your dog while you�re away

A choice between kennel-free overnight boarding, or comfortable private suites.
Huge outdoor space with artificial grass and play structures.
Swimming pools and custom made sprinklers in the summer.
Lots of heated and air conditioned indoor play space, which opens up into our outdoor area! They have the choice to play inside or outside.
24 hour supervision!','Posh Pet Hotel provides our boarding pet guests with the highest quality of comfort and care',1),

('Health Check','Its strongly recommended that all pets undergo a full wellness examination on a yearly basis, or more frequently if their individual situation requires. These thorough physical examinations and assessment of risk factors help us keep on top of developing issues and prevent many serious illnesses.','Our veterinarians can help to formulate a personalised plan that includeds preventative healthcare, detecting issues in the early stages and adapting to changes as your pet ages',1),
('Surgery','At Pet Paradise Doctors our veterinarians carry out surgery in the security of our dedicated surgical suite, using specialist equipment and in a sterile environment. Specially trained veterinary surgeons monitor the anaesthesia with modern equipment throughout the procedure and our surgeons employ the most modern surgical technques.','Dedicated. Compassionate. Skilled.',1)



Insert into dbo.tbBookingMaster values
(2019-04-21,1,1),
(2019-04-22,1,2),
(2019-04-23,1,3),
(2019-04-24,1,4),
(2019-04-25,1,5)

Insert into dbo.tbBookingDetail ([bookingDate], [bdstatus],[bookingID], [serID],[petID]) values
('2019-4-15',1,1,1,1),
('2019-4-16',1,2,2,2),
('2019-4-17',1,3,1,1),
('2019-4-18',1,2,3,2),
('2019-4-19',1,4,1,3),
('2019-4-20',1,1,5,1),
('2019-4-21',1,2,4,3),
('2019-4-22',1,3,3,5),
('2019-4-23',1,5,1,4)

Insert into dbo.tbPet ( [petDating] ,[petBreed], [petDOB], [petImage], [petName], [petPrice], [petStatus], [userID], [petStory]) values
(1,'Cardigan Welsh Corgi', '2017-1-1', 'null', 'MinMin', 120, 1, 1, 'The Cardigan Welsh Corgi is the older of the two Corgi dog breeds, with dogs of this type believed to have existed in Wales for more than 3,000 years. The Cardigan is distinguished by his long tail — like the sleeves of a cardigan sweater — and was used to drive cattle to market. Known as the yard-long dog, the Cardigan is sensible and affectionate. He loves to spend time with his family and is an active, fun-loving playmate for school-age children. The Cardigan’s medium-length coat comes in many colors and patterns, including red, brindle, blue merle and black, usually with white markings.'),
(0,'Bolognese', '2017-1-1', 'null', 'Milk', 20, 1, 1, 'the Bolognese dog breed loves to be at his family’s side. However, he also loves getting his way and can be quite crafty about it, so be careful — you could find yourself being manipulated by a 10-pound furball.'),
(1,'Boxer', '2017-1-1', 'null', 'Mi', 15, 1, 2, 'Boxers were originally bred to be medium-size guard dogs. Today, although they are a part of the AKC’s Working Group, they mostly find homes as loving family companions.'),
(1,'Chinook', '2017-1-1', 'null', 'Kiki', 19, 1, 3, 'Created in the White Mountains of New Hampshire, the Chinook dog breed made his name on Admiral Byrd’s first Antarctic expedition in 1928. These days he’s a multipurpose dog who’s happy hiking, competing in agility and other dog sports, pulling a sled or other conveyance, and playing with the kids.'),
(1,'Japanese Chin', '2017-1-1', 'null', 'Kuku', 19, 1, 2, 'The Japanese Chin dog breed hails from Asia, where he has been prized as a companion for more than a thousand years. He was a popular member of Chinese and Japanese imperial courts, and it was in Japan that his distinctive look was developed. This breed is elegant and dainty, mild-mannered and playful.'),
(1,'Pembroke Welsh Corgi', '2017-1-1', 'null', 'Lulu', 19, 1, 2, 'Originally bred to herd cattle, sheep, and horses, the Pembroke Welsh Corgi is an active and intelligent dog breed. Easy to train and eager to learn, Pembrokes are great with children and other pets, and you can find them in four different coat colors and markings.'),
(1,'Poodle', '2017-1-1', 'null', 'Muc', 19, 1, 3, 'Elegant. Proud. Clever. Poodles are impressive dogs, as the many best-in-show winners from this dog breed can attest. Behind the blue ribbons, impressive hairdos, and regal attitude, you’ll find an affectionate family dog with an ancient history and many talents.'),
(1,'Pomeranian', '2017-1-1', 'null', 'Nini', 19, 1, 3, 'Descended from large sled dog breeds, the now-tiny Pomeranian has a long and interesting history. The foxy-faced dog, nicknamed “the little dog who thinks he can,” is compact, active, and capable of competing in agility and obedience or simply being a family friend.')

Insert into dbo.datingMasterEntity  ( creDate, locat, [status], userID ) values
('2019-3-11', 'Ho Chinh Minh city', 1, 1),
('2018-4-17', 'Vung Tau beach', 1, 2),
('2018-5-10', 'Nha Trang city', 1, 3),
('2018-5-15', 'Ho Chi Minh city', 1, 1)

Insert into dbo.datingDetailEntity  ( [datingDate], [datingLocation], [datingMaster_ID], [petRequest_ID], [petRecieve_ID], [isAccepted], [specialStatus], [isNewNotification])  values
('2019-1-1', '195 Cao Thang - District 3', 1, 1, 2, 1, 0, 1),
('2019-1-10', 'Tao Dan Park', 1, 1, 2, 1, 1, 1),
('2019-1-15', '195 Cao Thang - District 3', 1, 1, 2, 1, 2, 1),
('2019-1-18', 'Vung Tau beach', 1, 1, 2, 1, 3, 1),
('2019-2-19', 'Nha Trang beach', 2, 3, 2, 1, 0, 1),
('2019-3-21', '23-9 park', 3, 2, 3, 1, 0, 1),
('2019-4-13', 'Pet Shop', 1, 2, 1, 1, 0, 1)

Insert into dbo.tbCategory ([CateName], [Status]) values
('Healthy Food', 1),
('Pet Outfit', 1),
('Accessories',1),
('Pet Toy', 1)

Insert into dbo.tbProduct ([ProImage], [Status], [Cate_ID] , [ProPrice], [ProColor], [ProName] , [ProDes]) values
('image', 1, 3, 70, 'black', 'dog hair cutting machine' , 'Type:
Pet Cleaning & Grooming Products
Item Type:
pet clipper
Power Source:
Battery
Charging Time:
4 Hour, 4 Hours
Voltage:
110-240V
Grooming Products Type:
Clippers, Trimmers & Blades'),

('image', 1, 3, 28, 'blue, pink, black, purple', 'leather collar' , 'New Ditsy Pet leather dog collars. Beautifully handcrafted in England using genuine leather with nickel plated buckles & D Rings. Available in an array of delightful bright colours. Comes with a Ditsy Pet presentation box too!'),
('image', 1, 3, 10, 'lemon', 'Dog Lead' , 'Dog Lead Sizes
Extra Small – 16mm x 110cm
Small/Medium – 20mm x 110cm
Large/ XL  – 25mm x 110cm'),

('image', 1, 2, 10, 'pink', 'Bandana' , 'It is entirely the customer’s responsibility to ensure suitability of our products for your pets, we recommend that you check daily for any signs of wear.'),
('image', 1, 3, 35, 'Orange ', 'Harness' , 'Our harnesses are not made to stop pulling, however they do relieve strain on the neck that can be caused by collars. Breeds are only to be used as a guide, we recommend you measure your dog as individual sizes can vary from dog to dog.'),
('image', 1, 1, 1.5, 'green', 'Cesar® Canine Cuisine Adult Dog Food' , 'Dogs with sophisticated palates will enjoy a rich culinary experience with CESAR Canine Cuisine Gourmet Wet Dog Food in meaty juices or in sauce. From large to small breeds, indulge your pampered pooch with savory dog food featuring steak selections that make their mouth water and tail wag. CESAR Canine Cuisine T-Bone Steak Flavor Dog Food delights with a tantalizing pat texture, and is enhanced with vitamins and minerals for complete and balanced nutrition. Served in convenient trays with no-fuss, peel-away freshness seals, CESAR Adult Dog Food makes mealtime easy. Our gourmet wet dog food also uses ingredients formulated to meet nutritional levels established by the AAFCO dog food nutrient profiles for maintenance.'),
('image', 1, 1, 129, 'red', 'Wilderness' , 'Salmon in gravy flavor appeals to your dogs cravings; made with natural ingredients for a wholesome meal; contains no chicken or poultry by-product meals, corn, wheat or soy or artificial flavors, colors or preservatives'),
('image', 1, 1, 10, 'green', 'Herbsmith' , 'Made with no grain, no fillers, & no artificial preservatives, Smiling Dog treats help dogs live naturally. With 100% USA-sourced ingredients, our treats were developed with the carnivore in mind. Using simple, whole ingredients, you can reward your pup’s good behavior with a treat that’s actually good for him.'),
('image', 1, 4, 19, 'colorful', 'ZippyPaws' , 'Skinny Peltz are no-stuffing plush dog toys that provide hours of squeaking fun without the unnecessary need of cleaning up fuzzy stuffing mess! This plush toy set includes 3 large characters that were lovingly brought to life using the best quality materials that are durable and safe for your pets. The fox, raccoon, and squirrel will keep boredom at bay by entertaining your pooch with their fun designs and enticing sounds. Each toy contains 3 round squeakers, ideal for medium dogs who want to have a “squeakin’ good time”. ZippyPaws means design and quality. At our core, we stand for only giving your dogs the best. Sketching every design, hand-selecting the perfect materials, and running all finished products past our furry testing team allows us to ensure that every product sold is one that were proud to call ours.'),
('image', 1, 1, 4, 'Orange', 'Chuckit! Indoor Ball Dog Toy' , 'INDOOR PLAY: Plush ball features a lightweight design that protects surfaces in the home while providing an exciting bounce for pets
INTERACTIVE DOG TOYS: Circular design of the Indoor Ball allows toy to roll across tile and hardwood floors for pets that enjoy ground pursuit, making them great dog toys for boredom'),
('image', 1, 2, 52, 'grey', 'ThunderShirt® Insanely Calm™ Dog Anxiety Shirt' , 'Stop problem barking, chewing, and anxiety in your dog the natural way with the ThunderShirt Dog Anxiety Shirt. ThunderShirt is patented design applies a gentle, constant pressure that has a dramatic calming effect. Using pressure to relieve anxiety in people and animals has been a common practice for years such as swaddling infants and the use of gentle pressure and weighted vests to help people with autism.'),
('image', 1, 2, 16, 'red', 'Indiana Hoosiers NCAA T-Shirt' , 'This Pets First Indiana Hoosiers T-Shirt is an official NCAA licensed pet shirt with your favorite team is name and logo. These team t-shirts are a must-have for any true NCAA fan who loves their dog as much as they love their team. You and your furry pal can celebrate your favorite team together, strengthening the bond between pet and Pet Parent with decorated team graphics you will both love!'),
('image', 1, 2, 45, 'black', 'Top Paw® Summer Fun "Beach Addict" Pet Tee' , 'Let your dog share in your love for the beach with this Top Paw Grey Beach Addict Tee. This fun tee features a beautiful beach scene as well as an admission of beach time addiction, and slips on and off easily while offering a comfortable fit. Only at PetSmart.')

Insert into dbo.tbOrderMaster ([CreDate], [ShipDate], [Status], [User_ID]) values
('2019-10-10', '2019-11-12', 1, 1),
('2019-11-12', '2019-10-11', 1, 2),
('2019-12-11', '2019-12-12', 1, 3),
('2019-10-11', '2019-10-10', 1, 1),
('2019-12-10', '2019-11-11', 1, 2)

Insert into dbo.tbOrderDetail ([OrderDate], [Qty], [Status], [OrderID], [Pro_ID]) values
('2019-1-2', 2, 1, 1, 1),
('2019-2-1', 3, 1, 2, 2),
('2019-3-4', 1, 1, 1, 3),
('2019-1-1', 4, 1, 3, 3),
('2019-1-5', 12, 1, 1, 1),
('2019-5-1', 2, 1, 2, 2),
('2019-1-3', 1, 1, 3, 2),
('2019-10-1', 5, 1, 2, 1),
('2019-12-10', 9, 1, 3, 3),
('2019-9-9', 3, 1, 2, 2),
('2019-1-3', 3, 1, 1, 1)