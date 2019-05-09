
Use Prj4

Insert into dbo.tbUser([userDOB], [userMail], [userName], [userStatus], [userTel]) Values 
(1996-10-20,'mail2@gmail.com','DatLe',1,'0394641271'),
(1995-10-20,'mail3@gmail.com','Elisa',1,'0934117989'),
(1994-10-20,'mail4@gmail.com','Duy',1,'0708886925'),
(1993-10-20,'mail5@gmail.com','name5',1,'0909090909'),
(1993-10-20,'mail5@gmail.com','name6',1,'0909090909')



Insert into dbo.tbService ([SerDes],[SerName], [Status] ,[SerShortDes]) values
('Des1', 'ser1',1, 'Short Des'),
('Des2', 'ser2',1, 'Short Des'),
('Des3', 'ser3',1, 'Short Des'),
('Des4', 'ser4',1, 'Short Des'),
('Des5', 'ser5',1, 'Short Des')

Insert into dbo.tbBookingMaster values
(2019-10-21,1,1),
(2019-10-22,1,2),
(2019-10-23,1,3),
(2019-10-24,1,4),
(2019-10-25,1,5)

Insert into dbo.tbBookingDetail ([BookingDate], [Status],[BookingID], [SerID]) values
('2018-5-15',1,1,1),
('2018-5-16',1,2,2),
('2018-5-17',1,3,1),
('2018-5-18',1,2,3),
('2018-5-19',1,4,1),
('2018-5-20',1,1,5),
('2018-5-21',1,2,4),
('2018-5-22',1,3,3),
('2018-5-23',1,5,1)

Insert into dbo.tbPet ( [petDating] ,[petBreed], [petDOB], [petImage], [petName], [petPrice], [petStatus], [userID]) values
(1,'Coggy', '2017-1-1', 'null', 'MinMin', 100, 1, 1),
(0,'Coggy', '2017-1-1', 'null', 'Milk', 100, 1, 1),
(1,'Coggy', '2017-1-1', 'null', 'Mi', 100, 1, 2),
(1,'Coggy', '2017-1-1', 'null', 'Coggy', 100, 1, 3)

Insert into dbo.datingMasterEntity  ( creDate, locat, [status], userID ) values
('2018-1-1', 'hcm', 1, 1),
('2018-2-1', 'tn', 1, 2),
('2018-3-1', 'hn', 1, 3),
('2018-4-1', 'hcm', 1, 1)

Insert into dbo.datingDetailEntity  ([date], datingMasterID, petID)  values
('2019-1-1', 1, 1),
('2019-2-1', 2, 3),
('2019-3-1', 3, 2),
('2019-4-1', 1, 2)

Insert into dbo.tbCategory ([CateName]) values
('Cate1'),
('Cate2'),
('Cate3'),
('Cate4'),
('Cate5'),
('Cate6')

Insert into dbo.tbProduct ([ProImage], [Status], [Cate_ID] , [ProPrice], [ProColor], [ProName] , [ProDes]) values
('image', 1, 1, 10, 'red', 'pro1' , 'des1'),
('image', 1, 2, 12, 'blue', 'pro2' , 'des2'),
('image', 1, 1, 10, 'green', 'pro3' , 'des3'),
('image', 1, 3, 10, 'red', 'pro4' , 'des4'),
('image', 1, 1, 13, 'yellow', 'pro5' , 'des5'),
('image', 1, 2, 10, 'red', 'pro6' , 'des6'),
('image', 1, 1, 15, 'gray', 'pro7' , 'des7'),
('image', 1, 2, 10, 'red', 'pro8' , 'des8'),
('image', 1, 1, 17, 'white', 'pro9' , 'des9'),
('image', 1, 1, 10, 'red', 'pro10' , 'des10'),
('image', 1, 3, 12, 'black', 'pro11' , 'des11'),
('image', 1, 3, 10, 'red', 'pro12' , 'des12'),
('image', 1, 1, 11, 'black', 'pro13' , 'des13')

Insert into dbo.tbOrderMaster ([CreDate], [ShipDate], [Status], [User_ID]) values
('2019-10-10', '2019-11-12', 1, 1),
('2019-11-12', '2019-10-11', 1, 2),
('2019-12-11', '2019-12-12', 1, 3),
('2019-10-11', '2019-10-10', 1, 1),
('2019-12-10', '2019-11-11', 1, 2)

Insert into dbo.tbOrderDetail ([OrderDate], [Qty], [Status], [OrderID], [Pro_ID]) values
('2019-1-2', 10, 1, 1, 1),
('2019-2-1', 20, 1, 2, 2),
('2019-3-4', 13, 1, 1, 3),
('2019-1-1', 12, 1, 3, 3),
('2019-1-5', 15, 1, 1, 1),
('2019-5-1', 9, 1, 2, 2),
('2019-1-3', 20, 1, 3, 2),
('2019-10-1', 40, 1, 2, 1),
('2019-12-10', 32, 1, 3, 3),
('2019-9-9', 12, 1, 2, 2),
('2019-1-3', 13, 1, 1, 1)