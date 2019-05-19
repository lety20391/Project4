/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [ODetailID]
      ,[OrderDate]
      ,[Qty]
      ,[Status]
      ,[OrderID]
      ,[Pro_ID]
  FROM [Prj4].[dbo].[tbOrderDetail]

  SELECT * FROM [dbo].[tbOrderDetail] WHERE [Pro_ID] = 1

  SELECT [Pro_ID], SUM([Qty]) AS Total FROM [dbo].[tbOrderDetail] GROUP BY [Pro_ID]