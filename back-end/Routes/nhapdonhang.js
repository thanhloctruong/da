const express = require('express');
const NDH = require('../models/nhapdonhang')
const router = express.Router();

//hiển thị đơn hàng
router.get('/', async (req, res) => {
    const ndh = await NDH.find({})
    res.status(200).json(ndh)
    console.log(ndh)
})

//view đơn hàng
router.get('/:id', async (req,res) =>{
    const ndh = NDH.findOne({
        id : req.params.id
    })
    if(!ndh){
        res.status(400).json({message : 'View Không Thành Công'})
    }
    else{
        res.status(200).json(ndh)
    }
})


//tạo đơn hàng
router.post('/', async(req, res)=>{
    const {iddonhang, tu, den,idphuongtien,idcontainer,idsanpham,tensanpham,soluong,donvi,nhasanxuat} = req.body;
    if(!iddonhang || !tu || !den || idphuongtien || idcontainer || idsanpham || tensanpham || soluong || donvi || nhasanxuat){
        console.log('thieu')
    }
    const ndh =  await NDH.create({
        iddonhang,
        tu,
        den,
        idphuongtien,
        idcontainer,
        idsanpham,
        tensanpham,
        soluong,
        donvi,
        nhasanxuat,
        idcontainer
    })
    res.status(200).json(ndh)
})

//update đơn hàng
router.patch('/:id', async(req,res)=>{
    const ndh = await NDH.findOne({
        id : req.params.id
    })
    console.log(req.body)
  if(!ndh){
    res.status(400).json({message: 'Update Không Thành Công'})
  }
  else{
    const ndh = await NDH.updateOne({
        iddonhang: req.body.iddonhang,
        tu: req.body.tu,
        den: req.body.den,
        idphuongtien: req.body.idphuongtien,
        idcontainer: req.body.idcontainer,
        idsanpham: req.body.idsanpham,
        tensanpham: req.body.tensanpham,
        soluong: req.body.soluong,
        donvi: req.body.donvi,
        nhasanxuat: req.body.nhasanxuat,
        idcontainer: req.body.idcontainer
    })
    res.status(200).json(ndh)
  }
})

//delete đơn hàng, chưa làm xong

router.delete('/:id', async(req,res)=>{
    const ndh = await NDH.findOne({
        id : req.params.iddonhang
    })
    if(ndh){
        const ndh = await NDH.deleteOne()
    }
    res.status(200).json('delete thành công')
})

module.exports = router;

