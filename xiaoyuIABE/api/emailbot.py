import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random

def send_email(sender_email, sender_password, recipient_email, subject, body):
    # 创建一个多部分邮件消息
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject

    # 附加邮件正文
    msg.attach(MIMEText(body, 'plain'))

    try:
        # 连接到 Gmail 的 SMTP 服务器
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()  # 启用安全传输层
        server.login(sender_email, sender_password)  # 登录你的 Gmail 帐户

        # 发送邮件
        server.sendmail(sender_email, recipient_email, msg.as_string())
        print("Email sent successfully!")

    except Exception as e:
        print(f"Failed to send email. Error: {e}")

    finally:
        server.quit()  # 关闭 SMTP 服务器连接

def generateVerification():
    code = random.randint(0,999999)
    vericode = str(code).zfill(6)
    return vericode

def sendVerification(recipient_email):

    code = generateVerification()

    sender_email = "mxyy.06@gmail.com"
    sender_password = "nakeltreykywdnoh"
    recipient_email = recipient_email
    subject = f"Your verification code is {code}."
    body = f"Thanks for registering xxx, your verification code is {code}."

    send_email(sender_email, sender_password, recipient_email, subject, body)

    return code