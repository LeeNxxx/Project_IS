import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing import image

#กำหนด Label Mapping (เปลี่ยนให้ตรงกับที่ใช้เทรน)
class_labels = ["Daisy", "Dandelion", "Roses", "Sunflowers", "Tulips"]  # ปรับตาม dataset

#โหลดภาพที่อัปโหลด
image_path = "./content/img6.jpg"  # เปลี่ยนเป็น path ของภาพที่ต้องการ
img = image.load_img(image_path, target_size=(224, 224))  # ปรับขนาดให้ตรงกับโมเดล

#แปลงภาพเป็นอาร์เรย์
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)  # เพิ่มมิติให้เป็น (1, 224, 224, 3)
img_array = img_array / 127.5 - 1  #Normalize เหมือนตอนเทรน

#โหลดโมเดลที่เทรนไว้แล้ว
model = tf.keras.models.load_model("./models/flower_type.h5")  # เปลี่ยนเป็น path ของโมเดลที่บันทึกไว้

#ทำนายผลลัพธ์
predictions = model.predict(img_array)

#แปลงค่าทำนายเป็นคลาสที่คาดการณ์
predicted_class = np.argmax(predictions, axis=1)[0]  # ดึงคลาสที่มีค่าความน่าจะเป็นสูงสุด

#แสดงภาพพร้อมผลลัพธ์
plt.imshow(img)
plt.axis("off")
plt.title(f"Predicted Class: {class_labels[predicted_class]}")
plt.show()
