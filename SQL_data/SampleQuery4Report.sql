/****** Script for SelectTopNRows command from SSMS  ******/

Use Prj4
  SELECT * FROM [dbo].[tbOrderDetail] 

  SELECT [Pro_ID], SUM([Qty]) AS Total FROM [dbo].[tbOrderDetail] GROUP BY [Pro_ID] ORDER BY SUM([Qty]) DESC

  SELECT MIN([ProPrice]) AS [MIN] , MAX([ProPrice]) AS [MAX] FROM [dbo].[tbProduct]