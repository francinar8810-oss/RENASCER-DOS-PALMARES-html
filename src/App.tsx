/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  User, 
  Calendar, 
  Users, 
  Phone, 
  Award, 
  Briefcase, 
  Camera, 
  Upload, 
  Save, 
  Trash2,
  PlusCircle,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudentData {
  name: string;
  photo: string | null;
  birthDate: string;
  responsibleName: string;
  contactNumber: string;
  graduation: string;
  educator: string;
  projectName: string;
}

const INITIAL_STATE: StudentData = {
  name: '',
  photo: null,
  birthDate: '',
  responsibleName: '',
  contactNumber: '',
  graduation: '',
  educator: '',
  projectName: 'Renascer dos Palmares',
};

export default function App() {
  const [student, setStudent] = useState<StudentData>(INITIAL_STATE);
  const [isEditing, setIsEditing] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const resetForm = () => {
    if (window.confirm('Deseja realmente limpar todos os campos?')) {
      setStudent(INITIAL_STATE);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Cadastro salvo com sucesso! (Simulação)');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-12 print:bg-white">
      {/* Header with Brazilian Colors */}
      <header className="bg-[#009b3a] text-white p-6 shadow-lg relative overflow-hidden rounded-b-[2.5rem] print:hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#fedf00] rotate-45 translate-x-24 -translate-y-24 opacity-30"></div>
        <div className="max-w-5xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="bg-white p-1.5 rounded-2xl shadow-xl rotate-3">
              <div className="w-12 h-12 bg-[#002776] rounded-xl flex items-center justify-center border-2 border-[#fedf00]">
                <span className="text-white font-black text-xl tracking-tighter">RP</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-black tracking-tight uppercase">Renascer dos Palmares</h1>
              <div className="flex items-center gap-2">
                <span className="text-[#fedf00] font-bold text-[10px] md:text-xs tracking-widest uppercase opacity-90">Sistema de Gestão</span>
                <span className="bg-white/20 text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase">Sistema HTML</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-10 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-7 print:hidden">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden"
            >
              <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-800 flex items-center gap-3 text-lg">
                  <div className="w-2 h-6 bg-[#009b3a] rounded-full"></div>
                  Dados do Aluno
                </h2>
                <button 
                  onClick={resetForm}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"
                  title="Limpar formulário"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Photo Upload Area */}
                <div 
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-[2rem] hover:border-[#009b3a] hover:bg-green-50/30 transition-all group cursor-pointer" 
                  onClick={triggerUpload}
                >
                  {student.photo ? (
                    <div className="relative w-36 h-36">
                      <img 
                        src={student.photo} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-[1.5rem] border-4 border-white shadow-2xl"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-[#009b3a] p-2.5 rounded-xl text-white shadow-xl border-2 border-white">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 group-hover:text-[#009b3a]">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest">Foto do Aluno</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <User className="w-3 h-3 text-[#009b3a]" /> Nome do Aluno
                    </label>
                    <input 
                      type="text"
                      name="name"
                      value={student.name}
                      onChange={handleInputChange}
                      placeholder="Nome completo"
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#009b3a] outline-none transition-all font-semibold text-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-[#009b3a]" /> Nascimento
                    </label>
                    <input 
                      type="date"
                      name="birthDate"
                      value={student.birthDate}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#009b3a] outline-none transition-all font-semibold text-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Users className="w-3 h-3 text-[#009b3a]" /> Responsável
                    </label>
                    <input 
                      type="text"
                      name="responsibleName"
                      value={student.responsibleName}
                      onChange={handleInputChange}
                      placeholder="Nome do responsável"
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#009b3a] outline-none transition-all font-semibold text-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Phone className="w-3 h-3 text-[#009b3a]" /> Contato
                    </label>
                    <input 
                      type="tel"
                      name="contactNumber"
                      value={student.contactNumber}
                      onChange={handleInputChange}
                      placeholder="(00) 00000-0000"
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#009b3a] outline-none transition-all font-semibold text-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Award className="w-3 h-3 text-[#009b3a]" /> Graduação
                    </label>
                    <input 
                      type="text"
                      name="graduation"
                      value={student.graduation}
                      onChange={handleInputChange}
                      placeholder="Digite manualmente"
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#009b3a] outline-none transition-all font-semibold text-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <GraduationCap className="w-3 h-3 text-[#009b3a]" /> Educador
                    </label>
                    <input 
                      type="text"
                      name="educator"
                      value={student.educator}
                      onChange={handleInputChange}
                      placeholder="Nome do educador"
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#009b3a] outline-none transition-all font-semibold text-gray-700"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Briefcase className="w-3 h-3 text-[#009b3a]" /> Nome do Projeto
                    </label>
                    <input 
                      type="text"
                      name="projectName"
                      value={student.projectName}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#009b3a] outline-none transition-all font-semibold text-gray-700"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button 
                    onClick={handleSave}
                    className="flex-1 bg-[#009b3a] hover:bg-[#007b2e] text-white font-black py-4 rounded-[1.5rem] shadow-2xl shadow-green-200 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px]"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="flex-1 bg-[#002776] hover:bg-[#001a4d] text-white font-black py-4 rounded-[1.5rem] shadow-2xl shadow-blue-200 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px]"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Imprimir
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5 print:col-span-12 print:mt-0">
            <div className="sticky top-10">
              <div className="flex items-center justify-between mb-6 px-2 print:hidden">
                <h2 className="text-lg font-black text-gray-800 uppercase tracking-widest">Carteirinha</h2>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#009b3a]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#fedf00]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#002776]"></div>
                </div>
              </div>

              <motion.div 
                layout
                className="relative bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] overflow-hidden border border-gray-100 aspect-[3/4.8] max-w-sm mx-auto print:shadow-none print:border-2 print:border-gray-200"
              >
                {/* Brazilian Flag Design Elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-[#009b3a]"></div>
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[140%] h-48 bg-[#fedf00] rotate-12 opacity-10 blur-2xl"></div>
                
                <div className="relative p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-white">
                      <h3 className="font-black text-xl leading-none uppercase tracking-tighter">Renascer</h3>
                      <p className="text-[9px] font-black text-[#fedf00] uppercase tracking-[0.2em] mt-1">Dos Palmares</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl border-2 border-[#fedf00]">
                      <div className="w-8 h-8 bg-[#002776] rounded-xl flex items-center justify-center">
                         <span className="text-white font-black text-[10px]">RP</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                      <div className="w-36 h-36 bg-gray-50 rounded-[2.5rem] border-4 border-white shadow-2xl overflow-hidden mb-6 print:shadow-none">
                        {student.photo ? (
                          <img src={student.photo} alt="Student" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-200">
                            <User className="w-16 h-16" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#fedf00] text-[#002776] text-[9px] font-black px-4 py-1.5 rounded-full uppercase shadow-lg border-2 border-white whitespace-nowrap">
                        {student.graduation || "Graduação"}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-black text-[#002776] text-center uppercase break-words px-4 leading-tight mt-2">
                      {student.name || "Nome do Aluno"}
                    </h4>
                  </div>

                  <div className="mt-auto space-y-4 bg-slate-50/50 p-6 rounded-[2.5rem] border border-white shadow-inner print:bg-white print:shadow-none">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Nascimento</p>
                        <p className="text-xs font-bold text-gray-800">{student.birthDate ? new Date(student.birthDate).toLocaleDateString('pt-BR') : "--/--/----"}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Contato</p>
                        <p className="text-xs font-bold text-gray-800">{student.contactNumber || "(00) 00000-0000"}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Responsável</p>
                      <p className="text-xs font-bold text-gray-800 truncate">{student.responsibleName || "Não informado"}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
                      <div>
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Educador</p>
                        <p className="text-xs font-black text-[#009b3a] uppercase">{student.educator || "Professor"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Projeto</p>
                        <p className="text-[9px] font-black text-[#002776] uppercase">{student.projectName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="absolute bottom-0 left-0 w-full h-2.5 flex">
                  <div className="flex-1 bg-[#009b3a]"></div>
                  <div className="flex-1 bg-[#fedf00]"></div>
                  <div className="flex-1 bg-[#002776]"></div>
                  <div className="flex-1 bg-white"></div>
                </div>
              </motion.div>

              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-6 text-[#009b3a] font-black text-[10px] uppercase tracking-[0.3em] hover:tracking-[0.4em] transition-all print:hidden"
                >
                  Editar Informações
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 py-10 bg-white border-t border-gray-100 print:hidden">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#009b3a] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">RP</span>
            </div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
              Renascer dos Palmares • Sistema HTML
            </p>
          </div>
          <p className="text-gray-300 text-[8px] font-bold uppercase tracking-[0.4em]">
            Gestão de Projetos Sociais
          </p>
        </div>
      </footer>
    </div>
  );
}
