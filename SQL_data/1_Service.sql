
Use Prj4

Insert into dbo.tbUser Values 
(1996-10-20,'mail2@gmail.com','name2',1,'0909090909'),
(1995-10-20,'mail3@gmail.com','name3',1,'0909090909'),
(1994-10-20,'mail4@gmail.com','name4',1,'0909090909'),
(1993-10-20,'mail5@gmail.com','name5',1,'0909090909'),
(1993-10-20,'mail5@gmail.com','name6',1,'0909090909')



Insert into dbo.tbService values
('Des1','Image1','ser1',1),
('Des2','Image2','ser2',1),
('Des3','Image3','ser3',1),
('Des4','Image4','ser4',1),
('Des5','Image5','ser5',1)

Insert into dbo.tbBookingMaster values
(2019-10-21,1,1),
(2019-10-22,1,2),
(2019-10-23,1,3),
(2019-10-24,1,4),
(2019-10-25,1,5)

Insert into dbo.tbBookingDetail values
(2018-5-15,1,1,1),
(2018-5-16,1,2,2),
(2018-5-17,1,3,1),
(2018-5-18,1,2,3),
(2018-5-19,1,4,1),
(2018-5-20,1,1,5),
(2018-5-21,1,2,4),
(2018-5-22,1,3,3),
(2018-5-23,1,5,1)

Insert into dbo.petEntity (breed, dob, [image], [name], price, [status], UserOwner) values
('Coggy', 2017-1-1, 'null', 'MinMin', 100, 1, 1),
('Coggy', 2017-1-1, 'null', 'Milk', 100, 1, 1),
('Coggy', 2017-1-1, 'null', 'Mi', 100, 1, 2),
('Coggy', 2017-1-1, 'null', 'Coggy', 100, 1, 3)

Insert into dbo.datingMasterEntity  ( creDate, locat, [status], userID ) values
(2018-1-1, 'hcm', 1, 1),
(2018-2-1, 'tn', 1, 2),
(2018-3-1, 'hn', 1, 3),
(2018-4-1, 'hcm', 1, 1)

Insert into dbo.datingDetailEntity  ([date], datingMasterID, petID)  values
(2019-1-1, 1, 1),
(2019-2-1, 2, 3),
(2019-3-1, 3, 2),
(2019-4-1, 1, 2)

