
Use Prj4
GO


go
SELECT DISTINCT   o.Qty, o.Pro_ID, p.ProPrice, o.OrderDate,(o.Qty*p.ProPrice) as tongcong

FROM tbOrderDetail as o , tbProduct as p

where o.Pro_ID=p.ProID and month(o.OrderDate)=5;


go
SELECT  sum((o.Qty*p.ProPrice)) as Tongdoanhthu

FROM tbOrderDetail as o , tbProduct as p

where o.Pro_ID=p.ProID and month(o.OrderDate)=5;