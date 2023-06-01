const dayjs = require("dayjs");
const brlCurrencyFormatter = require("../utils/brlCurrencyFormatter");

module.exports = (clientUrl, order, totalPrice, user,) => `
<div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" bgcolor="#ffd4e0" style="padding:0;Margin:0;background-color:#ffd4e0">
           <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
             <tr>
              <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:30px;padding-right:30px">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:540px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="${clientUrl}" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#52687E;font-size:14px"><img src="https://res.cloudinary.com/dqsolpcpf/image/upload/v1681338737/Sweet_D/Logo_frhgmf.png" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="130"></a></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr>
          <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0;background-color:#ffffff">
           <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff">
             <tr>
              <td align="left" style="padding:30px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:540px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><h1 style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;font-size:36px;font-style:normal;font-weight:normal;color:#020202"><strong>Novo pedido confirmado!</strong></h1></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="padding:30px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:540px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><h1 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;font-size:26px;font-style:normal;font-weight:normal;color:#1d1d1d">Número do pedido: <strong>#${order.id}</strong></h1></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="Margin:0;padding-top:20px;padding-bottom:30px;padding-left:30px;padding-right:30px">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:540px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><h1 style="Margin:0;line-height:38px;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;font-size:32px;font-style:normal;font-weight:normal;color:#5b5656">Total: <span style="color:#ff7c9f">${brlCurrencyFormatter.format(totalPrice)}</span></h1><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:24px;color:#5b5656;font-size:16px"><strong>Usuário: ${user.name}</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:24px;color:#5b5656;font-size:16px"><strong>Telefone: ${user.phone}</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:24px;color:#5b5656;font-size:16px"><strong>Data de entrega: ${dayjs(order.date).format('DD/MM/YYYY - HH:mm:ss').toString()}</strong></p></td>
                     </tr>
										 <tr>
										 	<td align="center" style="padding:0;Margin:0;font-size:0px;padding-top:25px"><a target="_blank" href="${'https://wa.me/55' + user.phone.replace(' ', '').replace('(', '').replace(')', '').replace('-', '')}" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#52687E;font-size:14px"><img class="adapt-img" src="https://muxcni.stripocdn.email/content/guids/CABINET_5ac4bcddb2f562b0858f3f5395bd7df1004c78074ca92e9e1ba8a7f0639ef33e/images/g3179c69b3e150ff8fc9f1e2c8f63ad6a584fa4fd75f77d132a17535af73bdcb76fbfdddd99d794d956b4e8e0b894a4d3_640.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="50"></a></td>
										 </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:25px"><!--[if mso]><a href="${clientUrl + '/admin/order/' + order.id}" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="${clientUrl + '/admin/order/' + order.id}" 
                style="height:41px; v-text-anchor:middle; width:147px" arcsize="24%" stroke="f"  fillcolor="#ff94b1">
		<w:anchorlock></w:anchorlock>
		<center style='color:#ffffff; font-family:arial, "helvetica neue", helvetica, sans-serif; font-size:15px; font-weight:400; line-height:15px;  mso-text-raise:1px'>Ver pedido</center>
	</v:roundrect></a>
<![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#2CB543;background:#ff94b1;border-width:0px;display:inline-block;border-radius:10px;width:auto;mso-border-alt:10px;mso-hide:all"><a href="${clientUrl + '/admin/order/' + order.id}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;padding:10px 30px 10px 30px;display:inline-block;background:#ff94b1;border-radius:10px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;border-color:#ff94b1">Ver pedido</a></span><!--<![endif]--></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" bgcolor="#ffd4e0" style="padding:0;Margin:0;background-color:#ffd4e0">
           <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
             <tr>
              <td align="left" style="padding:30px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:540px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:30px;padding-bottom:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:21px;color:#52687E;font-size:14px">Copyright© 2023 Sweet-D<br>(38) 99968-9339</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
`