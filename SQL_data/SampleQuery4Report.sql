/****** Script for SelectTopNRows command from SSMS  ******/


  SELECT * FROM [dbo].[tbOrderDetail] WHERE [Pro_ID] = 1

  SELECT [Pro_ID], SUM([Qty]) AS Total FROM [dbo].[tbOrderDetail] GROUP BY [Pro_ID]

  SELECT MIN([ProPrice]) AS [MIN] , MAX([ProPrice]) AS [MAX] FROM [dbo].[tbProduct]